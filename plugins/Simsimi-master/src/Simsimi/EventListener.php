<?php

namespace Simsimi;

use pocketmine\event\Listener;
use pocketmine\event\player\PlayerChatEvent;

class EventListener implements Listener{

    private $plugin;

    /**
     * EventListener constructor.
     * @param Main $plugin
     */
    public function __construct(Main $plugin)
    {
        $this->plugin = $plugin;
    }

    public function onChat(PlayerChatEvent $e): void{
        $player = $e->getPlayer();
        $name = strtolower($player->getName());
        if(Main::$on){
            $this->plugin->getScheduler()->scheduleDelayedTask(new Task(Main::PREFIX . '§e ' . Main::getMsg($e->getMessage())), 5);
        }elseif(in_array($name, Main::$selfon)){
            $player->sendMessage("You -> Simsimi: " . $e->getMessage());
            $player->sendMessage("Simsimi -> You: " . Main::getMsg($e->getMessage()));
            $e->setCancelled();
        }
        return;
    }
}
