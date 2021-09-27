# Plugins for c3cbot 0.x
use for https://github.com/c3cbot/c3c-0x
# Cách cài trên Windows/macOS/Linux(máy tính)
Tải source code dưới dạng file .zip (với Windows hoặc macOS) hoặc .tar.gz (Linux), giải nén bỏ vào folder plugins.
# Cách cài trên Termux 
Vào termux, gõ 
```sh
$ ./start-ubuntu.sh
```
Sau đó, paste dòng lệnh sau vào:
```sh 
$ cd ~/c3c && mv plugins/nodemodules/ ~/nodemodules && rm -r plugins && git clone https://github.com/CuSO4-c3c/plugins && mv ~/nodemodules ~/c3c/plugins/nodemodules && cd ~/c3c
```
(trong gói plugins này chưa có folder nodemodules)
