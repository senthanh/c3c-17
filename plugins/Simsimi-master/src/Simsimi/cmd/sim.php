<?php

namespace Simsimi\cmd;

use pocketmine\command\Command;
use pocketmine\command\CommandSender;
use pocketmine\command\PluginIdentifiableCommand;
use pocketmine\command\utils\CommandException;
use pocketmine\plugin\Plugin;
use Simsimi\Main;

class sim extends Command implements PluginIdentifiableCommand{

    /**
     * sim constructor.
     */
    public function __construct()
    {
        parent::__construct('sim', 'Chat With Simsimi', Main::PREFIX.'§2 Sử Dụng: /sim <msg>', []);
    }

    /**
     * @param CommandSender $sender
     * @param string $commandLabel
     * @param array $args
     * @return mixed|void
     */
    public function execute(CommandSender $sender, string $commandLabel, array $args)
    {
        if(count($args) == 0){
            $sender->sendMessage(Main::PREFIX.'§2 Sử Dụng: /sim <msg>');
            return;
        }
        $sender->sendMessage("Simsimi -> You: " . Main::getMsg(implode($args)));
        return;
    }

    public function getPlugin(): Plugin
    {
        return Main::getInstance();
    }
}
