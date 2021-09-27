<?php

namespace Simsimi\cmd;

use pocketmine\command\Command;
use pocketmine\command\CommandSender;
use pocketmine\command\PluginIdentifiableCommand;
use pocketmine\plugin\Plugin;
use Simsimi\Main;

class simall extends Command implements PluginIdentifiableCommand{

    /**
     * sim constructor.
     */
    public function __construct()
    {
        parent::__construct('simall', 'Chat With Simsimi', Main::PREFIX.'§2 Sử Dụng: /simall', []);
    }

    /**
     * @param CommandSender $sender
     * @param string $commandLabel
     * @param array $args
     * @return mixed|void
     */
    public function execute(CommandSender $sender, string $commandLabel, array $args)
    {
        Main::$on = !Main::$on;
        $this->getPlugin()->getServer()->broadcastMessage(Main::PREFIX.'§a Tính năng chat toàn server của simsimi đã được '.(Main::$on ? 'bật' : 'tắt').'!');
    }

    public function getPlugin(): Plugin
    {
        return Main::getInstance();
    }
}
