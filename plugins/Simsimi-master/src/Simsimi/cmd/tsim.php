<?php

namespace Simsimi\cmd;

use pocketmine\command\Command;
use pocketmine\command\CommandSender;
use pocketmine\command\PluginIdentifiableCommand;
use pocketmine\plugin\Plugin;
use Simsimi\Main;

class tsim extends Command implements PluginIdentifiableCommand{

    /**
     * sim constructor.
     */
    public function __construct()
    {
        parent::__construct('tsim', 'Chat With Simsimi', Main::PREFIX.'§3 Sử Dụng: /tsim <msgin> ### <msgout>', []);
    }

    /**
     * @param CommandSender $sender
     * @param string $commandLabel
     * @param array $args
     * @return mixed|void
     */
    public function execute(CommandSender $sender, string $commandLabel, array $args)
    {
        $args = implode(" ", $args);
        $array = explode(' ### ', $args);
        if(count($array) != 2){
            $sender->sendMessage(Main::PREFIX.'§3 Sử Dụng: /tsim <msgin> ### <msgout>');
            return;
        }
        Main::teachSim($array[0], $array[1]);
        $sender->sendMessage(Main::PREFIX.'§a Bạn Đã Dạy Cho Simsimi: §r"'.$array[0].'§r"§a -> §r"'.$array[1].'§r"§a!');
        return;
    }

    public function getPlugin(): Plugin
    {
        return Main::getInstance();
    }
}
