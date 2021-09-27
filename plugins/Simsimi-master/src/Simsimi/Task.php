<?php

namespace Simsimi;

use pocketmine\scheduler\Task as PMTask;

class Task extends PMTask{

    public $msg;

    /**
     * Task constructor.
     * @param string $msg
     */
    public function __construct(string $msg)
    {
        $this->msg = $msg;
    }

    /**
     * @param int $currentTick
     */
    public function onRun(int $currentTick)
    {
        \pocketmine\Server::getInstance()->broadcastMessage($this->msg);
    }
}
