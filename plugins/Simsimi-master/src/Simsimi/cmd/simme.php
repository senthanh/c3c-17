<?php

namespace Simsimi\cmd;

use pocketmine\command\Command;
use pocketmine\command\CommandSender;
use pocketmine\command\PluginIdentifiableCommand;
use pocketmine\plugin\Plugin;
use Simsimi\Main;

class simme extends Command implements PluginIdentifiableCommand{

    /**
     * sim constructor.
     */
    public function __construct()
    {
        parent::__construct('simme', 'Chat With Simsimi', Main::PREFIX.'§3 Sử Dụng: /simme', []);
    }

    /**
     * @param CommandSender $sender
     * @param string $commandLabel
     * @param array $args
     * @return mixed|void
     */
    public function execute(CommandSender $sender, string $commandLabel, array $args)
    {
        if(!cmd::checkPlayer($sender)) return;
        $name = strtolower($sender->getName());
        if(in_array($name, Main::$selfon)){
            unset(Main::$selfon[$name]);
            $sender->sendMessage(Main::PREFIX.'§a Bạn đã tắt tính năng chat thường với simsimi!');
        }else{
            Main::$selfon[] = $name;
            $sender->sendMessage(Main::PREFIX.'§a Bạn đã bật tính năng chat thường với simsimi!');
        }
        return;
    }

    public function getPlugin(): Plugin
    {
        return Main::getInstance();
    }
}
