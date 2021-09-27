<?php
namespace Simsimi;

use pocketmine\command\CommandSender;
use pocketmine\Player;
use pocketmine\plugin\PluginBase;
use pocketmine\event\Listener;
use pocketmine\utils\Config;
use Simsimi\cmd\{sim, tsim, simall, simme};

class Main extends PluginBase{

    public static $instance;
    public static $data;
    public const URL = "http://ghuntur.com/simsim.php?lc=vn&deviceId&bad=0&txt=";
    public static $on = false;
    public static $selfon = [];
    public const PREFIX = '§b[§6Simsimi§b]§3->§r';

    /**
     * On Enable
     */
    public function onEnable()
    {
        parent::onEnable();
        self::$instance = $this;
        $this->getServer()->getPluginManager()->registerEvents(new EventListener($this), $this);
        $this->registerCommands();
        self::$data = new Config($this->getDataFolder().'data.json', Config::JSON);
    }

    /**
     * Register Commands
     */
    public function registerCommands(): void{
        $this->getServer()->getCommandMap()->register($this->getDescription()->getName(), new sim());
        $this->getServer()->getCommandMap()->register($this->getDescription()->getName(), new tsim());
        $this->getServer()->getCommandMap()->register($this->getDescription()->getName(), new simall());
        $this->getServer()->getCommandMap()->register($this->getDescription()->getName(), new simme());
    }

    /**
     * @param string $in
     * @param string $out
     * @return bool
     */
    public static function teachSim(string $in, string $out): bool{
        $config = self::$data->getAll();
        $config[strtolower($in)] = $out;
        self::$data->setAll($config);
        return self::$data->save();
    }

    /**
     * @param string $msg
     * @return string
     */
    public static function getMsg(string $msg): string{
        $config = self::$data->getAll();
        if (isset($config[strtolower($msg)])) {
            $string = $config[strtolower($msg)];
        } else {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FRESH_CONNECT, true);
            curl_setopt($ch, CURLOPT_URL, self::URL . urlencode($msg));
            $string = str_replace("\n", '', (string)curl_exec($ch));
            if ($string == '') $string = "Ey người anh em, xem đã có lỗi xảy ra rồi! Xin hãy báo cho admin để xử lý nha.";
            if (preg_match("/" . str_replace(['/', '?'], ['\/', '\?'], 'https://play.google.com/store/apps/details?id=|Talk with random person: https://play.google.com/store/apps/details?id=www.speak.com|Video Chat with random person: https://play.google.com/store/apps/details?id=livemeet.app.com') . "/", $string)) $string = 'Nói Gì Vậy, Tôi Không Có Hiểu Gì Hét Á :v.';
        }
        return $string;
    }

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

    /**
     * @return static
     */
    public static function getInstance(): self{
        return self::$instance;
    }

    /**
     * On Disable
     */
    public function onDisable()
    {
        self::$data->save();
        parent::onDisable();
    }
}
