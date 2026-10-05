# 加密资源破解全过程

本文记录 `yltool-V9.1.1.apk` 中 36 个加密 `assets/*.java` 的完整破解过程，包括所有走过的弯路——因为**弯路本身就是结论的一部分**。

最终结果：**36/36 全部解密成功**，得到带中文注释的原始 HTML 源码。

---

## 1. 现象：36 个可疑的 `.java` 文件

APK 的 `assets/` 下有一批命名很像源码的文件：

```
assets/index.java    273,030 B
assets/VIVO.java     271,681 B
assets/termux.java   259,086 B
assets/OPPO.java     217,666 B
...
```

但检查后立刻排除了"这是源码"的可能：

```python
b = open('assets/index.java','rb').read()
b[:32].hex()          # a428102a01f05699ef5c0d8328960cd9...
# 无法用 utf-8 或 gbk 解码
# 熵 ≈ 7.95 / 8.0   → 高度随机，是加密不是压缩
```

判据：
- 长度 `% 16 == 6`，**不是分组密码对齐**，也排除了 ECB
- 16 字节分组重复率 1.0000（完全无重复）→ 不是 ECB
- 不同文件间 XOR 无规律 → 不是固定密钥流复用
- → **AEAD 流式加密**（AES-GCM 或 ChaCha20-Poly1305）

---

## 2. 从 Java 层读出算法与格式

在反编译产物中定位到 `AssetsEncryptor.java`：

```java
private static final String O0lll1ll = "AES/GCM/NoPadding";   // 算法
private static final int I100lOI0l1 = 12;                      // IV 长度
private static final int l0lI011   = 128;                      // tag 长度

public static byte[] O0lll1ll(byte[] bArr) {                   // 解密
    byte[] iv = new byte[12];
    System.arraycopy(bArr, 0, iv, 0, 12);                      // 前 12 字节 = IV
    int len = bArr.length - 12;
    byte[] body = new byte[len];
    System.arraycopy(bArr, 12, body, 0, len);                  // 其余 = 密文‖tag
    ...
    Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
    cipher.init(2, new SecretKeySpec(key, "AES"), new GCMParameterSpec(128, iv));
    return cipher.doFinal(body);
}
```

**得到格式：`[IV:12][密文 ‖ GCM Tag:16]`**

### 密钥从哪来

```java
private static byte[] l0lI011() {          // 优先走 native
    byte[] k = O0OO1Oll1;                   // 静态字段，由外部注入
    return (NativeCrypto.isNativeLoaded() && (d = NativeCrypto.deriveKey(k)) != null
            && d.length == 32) ? d : OI01I0Il0(k);   // 失败则走 Java 兜底
}

private static byte[] OI01I0Il0(byte[] bArr) {   // Java 兜底
    MessageDigest md = MessageDigest.getInstance("SHA-256");
    byte[] buf = new byte[bArr.length + 32];
    byte[] seed = NativeCrypto.deriveSeedForFallback();
    byte[] salt = NativeCrypto.deriveSaltForFallback();
    System.arraycopy(seed, 0, buf, 0, 16);
    System.arraycopy(salt, 0, buf, 16, 16);
    System.arraycopy(bArr, 0, buf, 32, bArr.length);
    return md.digest(buf);                  // SHA-256(seed ‖ salt ‖ 输入)
}
```

### 输入 `bArr` 是什么

```java
// YouLongApp.java:30-33
byte[] certSha256Fingerprint = SignatureVerifier.getCertSha256Fingerprint(this);
AssetsEncryptor.O1111lI0OI(certSha256Fingerprint);   // 注入
```

**密钥与 APK 签名证书绑定** —— 这既是加密方案，也是防篡改手段。

---

## 3. 提取签名证书

`SignatureVerifier.rebuildExpectedHash()` 里有一个 XOR 混淆的期望值，还原后：

```python
pairs = [('\x06q\x06ztz\x01{',66), ('\x11egbegd\x15',33), ('&UUR%+*"',19),
         ('\x10\x14m\x13g\x10g\x10',85), ('s\x07rts\x05\x08s',49),
         ('4AD226B1',119), ('N;KKN?>I',10), ('5D46AE2C',0)]
''.join(''.join(chr(ord(c)^i) for c in s) for s,i in pairs)
# → D3D868C90DFCDFE45FFA6891EA8F2E2EB6CEB49BC63EEA5FD1AAD54C5D46AE2C
```

从 APK v2 签名块中提取证书 DER（外壳 APK 无 v1 签名，必须手工解析 APK Signing Block）：

```python
# 定位 "APK Sig Block 42"，解析 id=0x7109871a 的 v2 signer，
# 再从中取出 length-prefixed 的证书 DER
der = extract_v2_cert('yltool-V9.1.1.apk')
hashlib.sha256(der).hexdigest().upper()
# → D3D868C90DFCDFE45FFA6891EA8F2E2EB6CEB49BC63EEA5FD1AAD54C5D46AE2C   ✓ 完全吻合
```

到这一步，**算法、格式、证书指纹全部拿到**，理论上只剩 native 的 seed/salt。

---

## 4. 弯路一：静态推导 seed/salt（错误）

`libnativecrypto.so` 只导出 `JNI_OnLoad`，其余函数通过 `RegisterNatives` 动态注册。解析 `.data.rel.ro` 的注册表（需先应用 `R_AARCH64_RELATIVE` 重定位）得到函数地址：

| 函数 | 地址 |
|---|---|
| `deriveSeedForFallback` | `0x1124` |
| `deriveSaltForFallback` | `0x11e0` |
| `deriveKey` | `0x129c` |
| `decrypt` | `0x1438` |

反汇编 `0x1124`：

```asm
mov  w9, #-9            ; -9
adrp x10, #0 ; add x10, x10, #0x8b0     ; 数组 A
adrp x11, #0 ; add x11, x11, #0x8a0     ; 数组 B
mov  w12, #7
mov  w13, #0x3d         ; 0x3d
loop:
cmp  x8, #9
ldrb w15, [x10, x8]     ; A[i]
ldrb w16, [x11, x8]     ; B[i]
csel w17, w12, w9, lo   ; i<9 ? 7 : -9      ← 我在这里理解错了
add  w17, w17, w8
ldrb w17, [x11, w17, sxtw]
eor  w15, w15, w16
eor  w15, w15, w13
eor  w15, w15, w17
strb w15, [x14, x8]     ; out[i]
```

我按 `csel lo` 的直觉写成：

```python
idx = (7 if i < 9 else -9) + i
out[i] = A[i] ^ B[i] ^ 0x3d ^ B[idx]
# → seed = fda4b919a14a188ea55d08aea0870625   （错误）
```

**用这个 seed 尝试了 120 种密钥组合，全部失败。**

## 5. 弯路二：Unicorn 模拟（修正）

既然静态读寄存器的语义容易出错，改用 **Unicorn 直接执行真实机器码**：

```python
mu = Uc(UC_ARCH_ARM64, UC_MODE_ARM)
mu.mem_map(lo, size)
for vaddr, off, filesz, memsz, flags in elf_segments(data):
    mu.mem_write(vaddr, data[off:off+filesz])

# 伪造 JNIEnv + vtable，把 NewByteArray/SetByteArrayRegion
# 换成 hook，直接截获 16 字节结果
mu.reg_write(UC_ARM64_REG_X0, fake_env)
mu.emu_start(0x1124, 0xFFFFFFFF, count=2_000_000)
```

结果立刻暴露了我的错误：

```
seed (模拟执行) : a37f126b44d8910e55cc7329883af61b   ← 正确
salt (模拟执行) : 5c9be42f713d8a06bc1ef74320d5689c   ← 与静态推导一致
```

**`salt` 静态推导对了，`seed` 错了** —— 说明两个函数里 `csel` 的索引语义有微妙差异（`sxtw` 符号扩展 + 数组基址偏移的组合），肉眼推导极易出错。

**教训：涉及寄存器级语义时，模拟执行比人工推导可靠得多。**

---

## 6. 最终密钥与验证

```python
SEED = bytes.fromhex("a37f126b44d8910e55cc7329883af61b")
SALT = bytes.fromhex("5c9be42f713d8a06bc1ef74320d5689c")
FP   = bytes.fromhex("d3d868c90dfcdfe45ffa6891ea8f2e2eb6ceb49bc63eea5fd1aad54c5d46ae2c")

KEY = hashlib.sha256(SEED + SALT + FP).digest()
# 8bac6c9a8249c0297a57b9155ede58192f8f5c6ffdb179d30c82dea8b17529c4
```

验证结果：

```
*** MATCH sha256(seed||salt||fp)  (36/36)
   assets/2weima.java: b'<!DOCTYPE html>\r\n<html lang="zh-CN">\r\n<head>...'
   assets/OPPO.java  : b'<!DOCTYPE html>\n<html lang="zh-CN">\n<head>...'
```

**36/36 全部通过 GCM tag 校验**——这是密码学意义上的确证，不存在巧合。

---

## 7. 为什么"密钥=证书指纹"这个设计值得注意

1. **加密即防篡改**：重签名后 `SHA-256(cert)` 变化 → 密钥变化 → 资源解密失败（GCM tag 校验不过）→ 应用白屏。这比单纯校验签名更狠，因为静态 patch 掉 `SignatureVerifier.verify()` 也没用。
2. **但强度受限于证书可见性**：签名证书本就随 APK 公开分发，所以这个密钥**对任何拿到 APK 的人都是可推导的**。它防的是"改包重签"，不是"逆向阅读"。
3. **native 层只是增加摩擦**：seed/salt 藏在 `.so` 里，但没有服务端参与、没有设备绑定，本质上是**混淆而非密钥管理**。

---

## 8. 可复现脚本

| 脚本 | 作用 |
|---|---|
| `decrypt/decrypt_assets.py` | 用固定密钥解密全部 36 个资源（**推荐**） |
| `decrypt/derive_seed_salt.py` | 用 Unicorn 模拟还原 seed/salt |
| `decrypt/extract_apksig_cert.py` | 从 APK Signing Block 提取 v2/v3 证书 |
| `decrypt/unpack.py` | 解开 `apk.tar.xz` 得到 4 个内嵌 APK |
| `decrypt/parse_jni_table.py` | 解析 `libnativecrypto.so` 的 JNI 注册表 |
| `decrypt/decode_string_arrays.py` | 还原 javascript-obfuscator 字符串表（10,748/14,085） |
