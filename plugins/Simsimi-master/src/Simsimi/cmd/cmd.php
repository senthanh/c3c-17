<?php

namespace Simsimi\cmd;

use pocketmine\command\CommandSender;
use pocketmine\Player;

class cmd{

    public const PREFIX = '§b[§6Simsimi§b]§3->§r';

    /**
     * @param CommandSender $sender
     * @return bool
     */
    public static function checkPlayer(CommandSender $sender): bool{
        if(!($sender instanceof Player)){
            $sender->sendMessage(self::PREFIX.'§c Bạn Chỉ Có Thể Dùng Lệnh Này Trong Server!');
            return false;
        }
        return true;
    }
}
