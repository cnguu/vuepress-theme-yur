---

title: 一键搭建 KMS 服务

meta:
  - name: description
    content: 一键搭建 KMS 服务
  - name: keywords
    content: 一键搭建，KMS，服务

created: 2019/12/31

updated: 2020/01/02
 
tags:
  - KMS

---

## 简介

`KMS`，Key Management System 的缩写，中文意思为 `密钥管理系统`

> 感谢 Github [开源项目](https://github.com/Wind4/vlmcsd)

### 食用环境

- 系统支持：CentOS 6+，Debian 7+，Ubuntu 12+
- 虚拟技术：任意
- 内存要求：≥128M

::: tip
1. 仅适用于三大 Linux 发行版。
2. KMS 服务安装完成后会加入开机自启动。
3. 默认记录日志，其日志位于 /var/log/vlmcsd.log。
:::

## 一键搭建

### 下载脚本

```bash
$ wget --no-check-certificate https://gleehub.com/20181101/kms.sh
```

### 添加执行权限

```bash
$ chmod +x kms.sh
```

### 运行脚本

```bash
$ ./kms.sh
```

> 注意设置安全组或者防火墙，端口：1688

### 检测服务运行

```bash
$ netstat -nxtlp | grep 1688
```

显示如下：

```bash
tcp     0   0 0.0.0.0:1688   0.0.0.0:*   LISTEN   27004/vlmcsd
tcp6    0   0 :::1688        :::*        LISTEN   27004/vlmcsd
```

### 命令大全

| 功能 | 命令 |
| :-: | :-: |
| 启动 | `/etc/init.d/kms start` |
| 停止 | `/etc/init.d/kms stop` |
| 重启 | `/etc/init.d/kms restart` |
| 状态 | `/etc/init.d/kms status` |

### 卸载

```bash
$ ./kms.sh uninstall
```

## 激活用法

- KMS 服务，用于在线激活 VOL 版本的 Windows 和 Office。
- 激活的前提是你的系统是批量授权版本，即 VL 版，一般企业版都是 VL 版。而 VL 版本的镜像一般内置 GVLK key，用于 KMS 激活。

使用管理员权限运行 cmd 查看系统版本，命令如下：

```bash
$ wmic os get caption
```

使用管理员权限运行 cmd 安装从上面列表得到的 key，命令如下：

```bash
$ slmgr /ipk xxxxx-xxxxx-xxxxx-xxxxx-xxxxx
```

使用管理员权限运行 cmd 将 KMS 服务器地址设置为你自己的 IP 或 域名，后面最好再加上端口号（:1688），命令如下：

```bash
$ slmgr /skms IP或域名:1688
```

使用管理员权限运行 cmd 手动激活系统，命令如下：

```bash
$ slmgr /ato
```

- 关于 Office 的激活，要求必须是 VOL 版本，否则无法激活。
- 找到你的 Office 安装目录
- 32 位默认一般为 C:\Program Files (x86)\Microsoft Office\Office16
- 64 位默认一般为 C:\Program Files\Microsoft Office\Office16
- Office16 是 Office 2016，Office15 就是 Office 2013，Office14 就是 Office 2010
- 打开以上所说的目录，应该有个 OSPP.VBS 文件。

使用管理员权限运行 cmd 进入 Office 目录，命令如下：

```bash
$ cd "C:\Program Files (x86)\Microsoft Office\Office16"
```

使用管理员权限运行 cmd 注册 KMS 服务器地址：

```bash
$ cscript ospp.vbs /sethst:IP或域名
```

使用管理员权限运行 cmd 手动激活 Office，命令如下：

```bash
$ cscript ospp.vbs /act
```

::: tip
- KMS 方式激活，其有效期只有 180 天。
- 每隔一段时间系统会自动向 KMS 服务器请求续期，请确保你自己的 KMS 服务正常运行。
:::

### 常见错误的对策

如果遇到在执行过程报错，请按以下步骤检查：
1. 你的 KMS 服务器是否挂了？
2. 你的 KMS 服务是否正常开启？
3. 你的系统或 Office 是否为批量 VL 版本？
4. 你的系统或 Office 是否修改过 Key 或未安装 GVLK Key？
5. 你是否以管理员权限运行 cmd？
6. 你的网络连接是否正常？
7. 你的本地 DNS 解析是否正常？
8. 如果你排除了以上的对策，那请根据错误提示代码自行搜索原因。

## 附录

### GVLKs for Office 2019

| Product | GVLK |
| :- | :- |
| Office Professional Plus 2019 | NMMKJ-6RK4F-KMJVX-8D9MJ-6MWKP |
| Office Standard 2019 | 6NWWJ-YQWMR-QKGCB-6TMB3-9D9HK |
| Project Professional 2019 | B4NPR-3FKK7-T2MBV-FRQ4W-PKD2B |
| Project Standard 2019 | C4F7P-NCP8C-6CQPT-MQHV9-JXD2M |
| Visio Professional 2019 | 9BGNQ-K37YR-RQHF2-38RQ3-7VCBB |
| Visio Standard 2019 | 7TQNQ-K3YQQ-3PFH7-CCPPM-X4VQ2 |
| Access 2019 | 9N9PT-27V4Y-VJ2PD-YXFMF-YTFQT |
| Excel 2019 | TMJWT-YYNMB-3BKTF-644FC-RVXBD |
| Outlook 2019 | 7HD7K-N4PVK-BHBCQ-YWQRW-XW4VK |
| PowerPoint 2019 | RRNCX-C64HY-W2MM7-MCH9G-TJHMQ |
| Publisher 2019 | G2KWX-3NW6P-PY93R-JXK2T-C9Y9V |
| Skype for Business 2019 | NCJ33-JHBBY-HTK98-MYCV8-HMKHJ |
| Word 2019 | PBX3G-NWMT6-Q7XBW-PYJGG-WXD33 |

### GVLKs for Office 2016

| Product | GVLK |
| :- | :- |
| Office Professional Plus 2016 | XQNVK-8JYDB-WJ9W3-YJ8YR-WFG99 |
| Office Standard 2016 | JNRGM-WHDWX-FJJG3-K47QV-DRTFM |
| Project Professional 2016 | YG9NW-3K39V-2T3HJ-93F3Q-G83KT |
| Project Standard 2016 | GNFHQ-F6YQM-KQDGJ-327XX-KQBVC |
| Visio Professional 2016 | PD3PC-RHNGV-FXJ29-8JK7D-RJRJK |
| Visio Standard 2016 | 7WHWN-4T7MP-G96JF-G33KR-W8GF4 |
| Access 2016 | GNH9Y-D2J4T-FJHGG-QRVH7-QPFDW |
| Excel 2016 | 9C2PK-NWTVB-JMPW8-BFT28-7FTBF |
| OneNote 2016 | DR92N-9HTF2-97XKM-XW2WJ-XW3J6 | 
| Outlook 2016 | R69KK-NTPKF-7M3Q4-QYBHW-6MT9B | 
| PowerPoint 2016 | J7MQP-HNJ4Y-WJ7YM-PFYGF-BY6C6 | 
| Publisher 2016 | F47MM-N3XJP-TQXJ9-BP99D-8K837 | 
| Skype for Business 2016 | 869NQ-FJ69K-466HW-QYCP2-DDBV6 | 
| Word 2016 | WXY84-JN2Q9-RBCCQ-3Q3J3-3PFJ6 | 

### GVLKs for Office 2013

| Product | GVLK |
| :- | :- |
| Office 2013 Professional Plus | YC7DK-G2NP3-2QQC3-J6H88-GVGXT |
| Office 2013 Standard | KBKQT-2NMXY-JJWGP-M62JB-92CD4 |
| Project 2013 Professional | FN8TT-7WMH6-2D4X9-M337T-2342K |
| Project 2013 Standard | 6NTH3-CW976-3G3Y2-JK3TX-8QHTT |
| Visio 2013 Professional | C2FG9-N6J68-H8BTJ-BW3QX-RM3B3 |
| Visio 2013 Standard | J484Y-4NKBF-W2HMG-DBMJC-PGWR7 |
| Access 2013 | NG2JY-H4JBT-HQXYP-78QH9-4JM2D |
| Excel 2013 | VGPNG-Y7HQW-9RHP7-TKPV3-BG7GB |
| InfoPath 2013 | DKT8B-N7VXH-D963P-Q4PHY-F8894 |
| Lync 2013 | 2MG3G-3BNTT-3MFW9-KDQW3-TCK7R |
| OneNote 2013 | TGN6P-8MMBC-37P2F-XHXXK-P34VW |
| Outlook 2013 | QPN8Q-BJBTJ-334K3-93TGY-2PMBT |
| PowerPoint 2013 | 4NT99-8RJFH-Q2VDH-KYG2C-4RD4F |
| Publisher 2013 | PN2WF-29XG2-T9HJ7-JQPJR-FCXK4 |
| Word 2013 | 6Q7VD-NX8JD-WJ2VH-88V73-4GBJ7 |

### GVLKs for Office 2010

| Product | GVLK |
| :- | :- |
| Office Professional Plus 2010 | VYBBJ-TRJPB-QFQRF-QFT4D-H3GVB |
| Office Standard 2010 | V7QKV-4XVVR-XYV4D-F7DFM-8R6BM |
| Office Home and Business 2010 | D6QFG-VBYP2-XQHM7-J97RH-VVRCK |
| Access 2010 | V7Y44-9T38C-R2VJK-666HK-T7DDX |
| Excel 2010 | H62QG-HXVKF-PP4HP-66KMR-CW9BM |
| SharePoint Workspace 2010 | QYYW6-QP4CB-MBV6G-HYMCJ-4T3J4 |
| InfoPath 2010 | K96W8-67RPQ-62T9Y-J8FQJ-BT37T |
| OneNote 2010 | Q4Y4M-RHWJM-PY37F-MTKWH-D3XHX |
| Outlook 2010 | 7YDC2-CWM8M-RRTJC-8MDVC-X3DWQ |
| PowerPoint 2010 | RC8FX-88JRY-3PF7C-X8P67-P4VTT |
| Project Professional 2010 | YGX6F-PGV49-PGW3J-9BTGG-VHKC6 |
| Project Standard 2010 | 4HP3K-88W3F-W2K3D-6677X-F9PGB |
| Publisher 2010 | BFK7F-9MYHM-V68C7-DRQ66-83YTP |
| Word 2010 | HVHB3-C6FV7-KQX9W-YQG79-CRY7T |
| Visio Premium 2010 | D9DWC-HPYVV-JGF4P-BTWQB-WX8BJ |
| Visio Professional 2010 | 7MCW8-VRQVK-G677T-PDJCM-Q8TCP |
| Visio Standard 2010 | 767HD-QGMWX-8QTDB-9G3R2-KHFGJ |

### Windows

| 操作系统版本 | KMS 客户端安装程序密钥 |
| :- | :- |
| Windows Server Datacenter (1809) | 6NMRW-2C8FM-D24W7-TQWMY-CWH2D |
| Windows Server Standard (1809) | N2KJX-J94YW-TQVFB-DG9YT-724CC |
| Windows Server Datacenter (1803) | 2HXDN-KRXHB-GPYC7-YCKFJ-7FVDG |
| Windows Server Standard (1803) | PTXN8-JFHJM-4WC78-MPCBR-9W4KR |
| Windows Server Datacenter (1709) | 6Y6KB-N82V8-D8CQV-23MJW-BWTG6 |
| Windows Server Standard (1709) | DPCNP-XQFKJ-BJF7R-FRC8D-GF6G4 |
| Windows Server Datacenter (2019 LTSC/LTSB) | WMDGN-G9PQG-XVVXX-R3X43-63DFG |
| Windows Server Standard (2019 LTSC/LTSB) | N69G4-B89J2-4G8F4-WWYCC-J464C |
| Windows Server Essentials (2019 LTSC/LTSB) | WVDHN-86M7X-466P6-VHXV7-YY726 |
| Windows Server Datacenter (2016 LTSC/LTSB) | CB7KF-BWN84-R7R2Y-793K2-8XDDG |
| Windows Server Standard (2016 LTSC/LTSB) | WC2BQ-8NRM3-FDDYY-2BFGV-KHKQY |
| Windows Server Essentials (2016 LTSC/LTSB) | JCKRF-N37P4-C2D82-9YXRT-4M63B |
| Windows 10 专业版 | W269N-WFGWX-YVC9B-4J6C9-T83GX |
| Windows 10 Pro N | MH37W-N47XK-V7XM9-C7227-GCQG9 |
| Windows 10 专业工作站 | NRG8B-VKK3Q-CXVCJ-9G2XF-6Q84J |
| Windows 10 专业工作站 N | 9FNHH-K3HBT-3W4TD-6383H-6XYWF |
| Windows 10 专业教育版 | 6TP4R-GNPTD-KYYHQ-7B7DP-J447Y |
| Windows 10 专业教育版 N | YVWGF-BXNMC-HTQYQ-CPQ99-66QFC |
| Windows 10 教育版 | NW6C2-QMPVW-D7KKK-3GKT6-VCFB2 |
| Windows 10 教育版 N | 2WH4N-8QGBV-H22JP-CT43Q-MDWWJ |
| Windows 10 企业版 | NPPR9-FWDCX-D2C8J-H872K-2YT43 |
| Windows 10 企业版 N | DPH2V-TTNVB-4X9Q3-TJR4H-KHJW4 |
| Windows 10 企业版 G | YYVX9-NTFWV-6MDM3-9PT4T-4M68B |
| Windows 10 企业版 G N | 44RPN-FTY23-9VTTB-MP9BX-T84FV |
| Windows 10 企业版 LTSC 2019 | M7XTQ-FN8P6-TTKYV-9D4CC-J462D |
| Windows 10 企业版 N LTSC 2019 | 92NFX-8DJQP-P6BBQ-THF9C-7CG2H |
| Windows 10 企业版 LTSB 2016 | DCPHK-NFMTC-H88MJ-PFHPY-QJ4BJ |
| Windows 10 企业版 N LTSB 2016 | QFFDN-GRT3P-VKWWX-X7T3R-8B639 |
| Windows 10 企业版 2015 LTSB | WNMTR-4C88C-JK8YV-HQ7T2-76DF9 |
| Windows 10 企业版 2015 LTSB N | 2F77B-TNFGY-69QQF-B8YKP-D69TJ |
| Windows Server 2012 R2 Server Standard | D2N9P-3P6X9-2R39C-7RTCD-MDVJX |
| Windows Server 2012 R2 Datacenter | W3GGN-FT8W3-Y4M27-J84CP-Q3VJ9 |
| Windows Server 2012 R2 Essentials | KNC87-3J2TX-XB4WP-VCPJV-M4FWM |
| Windows Server 2012 | BN3D2-R7TKB-3YPBD-8DRP2-27GG4 |
| Windows Server 2012 N | 8N2M2-HWPGY-7PGT9-HGDD8-GVGGY |
| Windows Server 2012 单语言版 | 2WN2H-YGCQR-KFX6K-CD6TF-84YXQ |
| Windows Server 2012 特定国家/地区版 | 4K36P-JN4VD-GDC6V-KDT89-DYFKP |
| Windows Server 2012 Server 标准版 | XC9B7-NBPP2-83J2H-RHMBY-92BT4 |
| Windows Server 2012 MultiPoint 标准版 | HM7DN-YVMH3-46JC3-XYTG7-CYQJJ |
| Windows Server 2012 MultiPoint 高级版 | XNH6W-2V9GX-RGJ4K-Y8X6F-QGJ2G |
| Windows Server 2012 Datacenter | 48HP8-DN98B-MYWDG-T2DCC-8W83P |
| Windows Server 2008 R2 Web 版 | 6TPJF-RBVHG-WBW2R-86QPH-6RTM4 |
| Windows Server 2008 R2 HPC 版 | TT8MH-CG224-D3D7Q-498W2-9QCTX |
| Windows Server 2008 R2 标准版 | YC6KT-GKW9T-YTKYR-T4X34-R7VHC |
| Windows Server 2008 R2 企业版 | 489J6-VHDMP-X63PK-3K798-CPX3Y |
| Windows Server 2008 R2 数据中心版 | 74YFP-3QFB3-KQT8W-PMXWJ-7M648 |
| 面向基于 Itanium 系统的 Windows Server 2008 R2 | GT63C-RJFQ3-4GMB6-BRFB9-CB83V |
| Windows Web Server 2008 | WYR28-R7TFJ-3X2YQ-YCY4H-M249D |
| Windows Server 2008 标准版 | TM24T-X9RMF-VWXK6-X8JC9-BFGM2 |
| 不带 Hyper-V 的 Windows Server 2008 标准版 | W7VD6-7JFBR-RX26B-YKQ3Y-6FFFJ |
| Windows Server 2008 企业版 | YQGMW-MPWTJ-34KDK-48M3W-X4Q6V |
| 不带 Hyper-V 的 Windows Server 2008 企业版 | 39BXF-X8Q23-P2WWT-38T2F-G3FPG |
| Windows Server 2008 HPC | RCTX3-KWVHP-BR6TB-RB6DM-6X7HP |
| Windows Server 2008 Datacenter | 7M67G-PC374-GR742-YH8V4-TCBY3 |
| 不带 Hyper-V 的 Windows Server 2008 数据中心版 | 22XQ2-VRXRG-P8D42-K34TD-G3QQC |
| 面向基于 Itanium 系统的 Windows Server 2008 | 4DWFP-JF3DJ-B7DTH-78FJB-PDRHK |
| Windows 8.1 专业版 | GCRJD-8NW9H-F2CDX-CCM8D-9D6T9 |
| Windows 8.1 Pro N | HMCNV-VVBFX-7HMBH-CTY9B-B4FXY |
| Windows 8.1 企业版 | MHF9N-XY6XB-WVXMC-BTDCT-MKKG7 |
| Windows 8.1 企业版 N | TT4HM-HN7YT-62K67-RGRQJ-JFFXW |
| Windows 8 专业版 | NG4HW-VH26C-733KW-K6F98-J8CK4 |
| Windows 8 Pro N | XCVCF-2NXM9-723PB-MHCB7-2RYQQ |
| Windows 8 企业版 | 32JNW-9KQ84-P47T8-D8GGY-CWCK7 |
| Windows 8 企业版 N | JMNMF-RHW7P-DMY6X-RF3DR-X2BQT |
| Windows 7 专业版 | FJ82H-XT6CR-J8D7P-XQJJ2-GPDD4 |
| Windows 7 专业版 N | MRPKT-YTG23-K7D7T-X2JMM-QY7MG |
| Windows 7 专业版 E | W82YF-2Q76Y-63HXB-FGJG9-GF7QX |
| Windows 7 企业版 | 33PXH-7Y6KF-2VJC9-XBBR8-HVTHH |
| Windows 7 企业版 N | YDRBP-3D83W-TY26F-D46B2-XCKRJ |
| Windows 7 企业版 E | C29WB-22CC8-VJ326-GHFJW-H9DH4 |

> win10专业版 W269N-WFGWX-YVC9B-4J6C9-T83GX
> office2016 cscript ospp.vbs /inpkey:XQNVK-8JYDB-WJ9W3-YJ8YR-WFG99
