// @name            Gladiatus Tools
// @namespace       http://www.neurone.it/index.php/gladiatus-tools/
// @autor           Giuseppe Bertone

it.neurone.gladiatustools.locale = {
    //Default in inglese
    language : "",
    simulationFailed : "",
    customAvatarImageUrl : "",
    customGuildImageUrl : "",
    simulate : "",
    simulating : "",
    winning : " ",
    go : "",
    stop : "",
    quest : "",
    arena : "",
    work : "",
    completed : "",
    goldLabel : "",
    winPercentage : "",
    totalEarnedGold : "",    
    /********************************
    / Recupera la lingua in base al sito
    /********************************/
    getLanguage : function(hostname) {
        var paesi = new Array
        (
            new Array("Argentina", /s\d+\.ar\.gladiatus\.com/i, "spagnolo"),
            new Array("Bielorussia", ".gladiatus.by", "russo"),
            new Array("Bosnia", /s\d+\.ba\.gladiatus\.org/i, "bosniaco"),
            new Array("Brasile", /s\d+\.br\.gladiatus\.com/i, "portoghese-brasiliano"),
            new Array("Bulgaria", /s\d+\.bg\.gladiatus\.com/i, "bulgaro"),
            new Array("Cile", /s\d+\.gladiatus\.cl/i, "spagnolo"),
            new Array("Cina", ".gladiatus.cn.com", "cinese"),
            new Array("Colombia", /s\d+\.co\.gladiatus\.com/i, "spagnolo"),
            new Array("Repubblica Ceca", /s\d+\.gladiatus\.cz/i, "ceco"),
            new Array("Danimarca", ".gladiatus.dk", "danese"),
            new Array("Inghilterra", /s\d+\.gladiatus\.com/i, "inglese"),
            new Array("Estonia", ".ee.gladiatus.com", "estone"),
            new Array("Finlandia", ".fi.gladiatus.com", "finlandese"),
            new Array("Francia", /s\d+\.gladiatus\.fr/i, "francese"),
            new Array("Germania", ".gladiatus.de", "tedesco"),
            new Array("Grecia", ".gladiatus.gr", "greco"),
            new Array("Ungheria", ".gladiatus.hu", "ungherese"),
            new Array("Indonesia", ".id.gladiatus.com", "indonesiano"),
            new Array("Israele", ".gladiatus.co.il", "ebraico"),
            new Array("Italia", /s\d+\.gladiatus\.it/i, "italiano"),
            new Array("Korea", ".kr.gladiatus.com", "coreano"),
            new Array("Lettonia", /s\d+\.gladiatus\.lv/i, "lettone"),
            new Array("Lituania", ".gladiatus.lt", "lituano"),
            new Array("Messico", /s\d+\.gladiatus\.com\.mx/i, "spagnolo"),
            new Array("Paesi Bassi", ".gladiatus.nl", "olandese"),
            new Array("Norvegia", ".gladiatus.no", "norvegese"),
            new Array("Peru", /s\d+\.gladiatus\.pe/i, "spagnolo"),
            new Array("Filippine", ".gladiatus.ph", "filippino"),
            new Array("Polonia", ".gladiatus.pl", "polacco"),
            new Array("Portogallo", ".gladiatus.com.pt", "portoghese"),
            new Array("Romania", ".gladiatus.ro", "rumeno"),	            
            new Array("Russia", ".gladiatus.ru", "russo"),
            new Array("Slovacchia", ".gladiatus.sk", "slovacco"),
            new Array("Spagna", /s\d+\.gladiatus\.es/i, "spagnolo"),
            new Array("Svezia", ".gladiatus.se", "svedese"),
            new Array("Taiwan", ".gladiatus.tw", "cinese"),
            new Array("Tailandia", ".th.gladiatus.com", "thai"),
            new Array("Turchia", ".gladiatus.net", "turco"),
            new Array("Ucraina", ".gladiatus.com.ua", "ucraino"),
            new Array("Emirati Arabi Uniti", /s\d+\.ae\.gladiatus\.com/i, "arabo"),
            new Array("USA", /s\d+\.gladiatus\.us/i, "inglese"),
            new Array("Venezuela", /s\d+\.ae\.gladiatus\.com\.ve/i, "spagnolo"),
            new Array("Vietnam", /s\d+\.gladiatus\.vn/i, "vietnamita")
        );

        for (var paese in paesi)
        {
            if(hostname.match(paesi[paese][1]))
            {
                return paesi[paese][2];
            }
        }
                
        return "inglese";
    },
    
    /*********************************
    / Inizializza la lingua corretta
    /********************************/
    init : function(hostname) {
        with(this) {
            var language = getLanguage(hostname)
            //alert("host:" + hostname + ", lingua: " + language);
            switch(language)
            {
                case "arabo":
                    this.simulationFailed = "المحاكاة فشلت! حاول مرة اخرى او اختر محاكي اخر من الخيارات";
                    this.customAvatarImageUrl = "يجب وضع وصلة الصورة الشخصية كاملة مع http:// وستصغر الصورة تلقائيا الى 168x194";
                    this.customGuildImageUrl = "Custom guild image absolute url (http://...). Image will be resized to 209x232 px.";
                    this.simulate = "محاكاة";
                    this.simulating = "جاري المحاكاة...";
                    this.winning = "الفوز";
                    this.go = "اهجم!";
                    this.stop = "توقف!";
                    this.quest = "الحانة:";
                    this.arena = "الساحة:";
                    this.work = "الأسطبل:";
                    this.completed = "تم!";
                    this.goldLabel = "الذهب";
                    this.winPercentage = "نسبة الإنتصارات:";
                    this.totalEarnedGold = "مجموع الحصول على الذهب:";
                    break;

				case "bulgaro":
					this.simulationFailed = "Не е възможно да извърши симулацията. Моля проверете използвания енджин в менюто Настройки>Използван Симулатор.";
					this.customAvatarImageUrl = "Url на собствения аватар(http://...). Картинката трябва да е с размери 168x194.";
					this.customGuildImageUrl = "Url на собствен аватар за гилдията (http://...). Картинката трябва да е с размери 209x232 точки.";
					this.simulate = "Симулация";
					this.simulating = "Симулация моля изчакайте...";
					this.winning = "Шанс за победа ";
					this.go = "Атакувай!";
					this.stop = "Не атакувай!!!";
					this.quest = "Куест:";
					this.arena = "Арена:";
					this.work = "Работа:";
					this.completed = "Готово!";
					this.winPercentage = "Шанс за победа:";
					this.totalEarnedGold = "Всичкото заграбено злато:";
					break;

				case "portoghese-brasiliano":
					this.simulationFailed = "Simulação falhou! Por favor tente novamente mais tarde ou selecione outro mecanismo de simulação nas configurações do Gladiatus Tools.";
					this.customAvatarImageUrl = "A URL do avatar personalizado (http://...). A imagem será redimensionada para 168x194 px.";
					this.customGuildImageUrl = "Custom guild image absolute url (http://...). Image will be resized to 209x232 px.";
					this.simulate = "Simular";
					this.simulating = "Simulando...";
					this.winning = "Chance de vitória: ";
					this.go = "Atacar!";
					this.stop = "PARE!";
					this.quest = "Expedição:";
					this.arena = "Arena:";
					this.work = "Estábulo:";
					this.completed = "Finalizada";
					this.goldLabel = "Ouro";
					this.winPercentage = "Porcentagem de vitórias:";
					this.totalEarnedGold = "Total de ouro ganho:";
					break;

                case "ceco":
                    this.simulationFailed = "Simulace selhala! Prosím, zkuste to později nebo v nastavení vyberte jiný engine pro simulování.";
                    this.customAvatarImageUrl = "Vybrat avatar (obrázek bude změněn na velikost 168x194 px)";
                    this.customGuildImageUrl = "Custom guild image absolute url (http://...). Image will be resized to 209x232 px.";
                    this.simulate = "Simulovat";
                    this.simulating = "Probíhá simulování...";
                    this.winning = "Výhra na ";
                    this.go = "Do toho!";
                    this.stop = "Zariskovat!";
                    this.quest = "Výprava:";
                    this.arena = "Aréna:";
                    this.work = "Práce:";
                    this.completed = "Hotovo!";
                    this.winPercentage = "Procento výher:";
                    this.totalEarnedGold = "Celkem vyděláno zlata:";
                    break; 
            
                case "spagnolo":
                    this.simulationFailed = "La simulación falló! Por favor intenta mas tarde o selecciona otro motor de simulación en las opciones de Gladiatus Tools.";
                    this.customAvatarImageUrl = "URL absoluta del avatar personalizado (http://...). La imagen será redimensionada a 168x194 px.";
                    this.customGuildImageUrl = "Custom guild image absolute url (http://...). Image will be resized to 209x232 px.";
                    this.simulate = "Simular";
                    this.simulating = "Simulando...";
                    this.winning = "Victoria ";
                    this.go = "Ir!";
                    this.stop = "NO!";
                    this.quest = "Expedición:";
                    this.arena = "Arena:";
                    this.work = "Trabajo:";
                    this.completed = "Terminado!";
                    this.goldLabel = "Oro";
                    this.winPercentage = "Porcentaje de victorias:";
                    this.totalEarnedGold = "Total de oro ganado:";
                    break; 
                    
                case "francese":
                    this.simulationFailed = "La simulation a échoué! Réessayez plus tard ou sélectionnez un autre moteur de simulation.";
                    this.customAvatarImageUrl = "URL de l'avatar personnalisé (http://...). L'image sera redimensionnée en 168 × 194 px.";
                    this.customGuildImageUrl = "URL de l'étendard personnalisé (http://...). L'image sera redimensionnée en 209 × 232 px.";
                    this.simulate = "Simuler";
                    this.simulating = "Simulation en cours...";
                    this.winning = "Gagnant à ";
                    this.go = "Go!";
                    this.stop = "STOP!";
                    this.quest = "Expédition:";
                    this.arena = "Arène:";
                    this.work = "Étable:";
                    this.completed = "Terminé!";
                    this.goldLabel = "Or";
                    this.winPercentage = "Pourcentage de victoire:";
                    this.totalEarnedGold = "Bénéfice:";
                    break;  
                    
                case "italiano":
                    this.simulationFailed = "Simulazione fallita! Prova più tardi oppure seleziona un'altro motore di simulazione dal menu delle opzioni di Gladiatus Tools.";
                    this.customAvatarImageUrl = "Url assoluta dell'avatar personalizzato (http://...). L'immagine verrà ridimensionata a 168x194 px.";
                    this.customGuildImageUrl = "Url assoluta del logo personalizzato (http://...). L'immagine verrà ridimensionata a 209x232 px.";
                    this.simulate = "Simula";
                    this.simulating = "Simulazione...";
                    this.winning = "Vincente ";
                    this.go = "Vai!";
                    this.stop = "ALT!";
                    this.quest = "Spedizione:";
                    this.arena = "Arena:";
                    this.work = "Stalla:";
                    this.completed = "Finito!";
                    this.goldLabel = "Oro";
                    this.winPercentage = "Percentuale vittorie:";
                    this.totalEarnedGold = "Oro guadagnato:";
                    break;
                      
                case "lettone":
                    this.simulationFailed = "Simulācija neizdevusies! Lūdzu mēģiniet vēlāk, vai izvēlaties citu simulātoru Gladiatus Tools opcijās.";
                    this.customAvatarImageUrl = "Pārveidotā avatara links (http://...). Bilde tiks samazināta līdz 168x194 px.";
                    this.customGuildImageUrl = "Custom guild image absolute url (http://...). Image will be resized to 209x232 px.";
                    this.simulate = "Simulēt";
                    this.simulating = "Simulē...";
                    this.winning = "Uzvara ";
                    this.go = "Sit!";
                    this.stop = "STOP!";
                    this.quest = "Ekspedīcija:";
                    this.arena = "Arēna:";
                    this.work = "Darbs:";
                    this.completed = "Pabeigts!";
                    this.winPercentage = "Uzvarēto procents:";
                    this.totalEarnedGold = "Arēnā iegūtais zelts:";
					break;
                      
                case "vietnamita":
                    this.simulationFailed = "Quá trình mô phỏng thất bại. Thử lại sau hoặc chọn dụng cụ mô phỏng khác ở Công cụ Gladiatus";
                    this.customAvatarImageUrl = "Đường dẫn đến hình ảnh đại diện (http://...). Hình ảnh sẽ được định dạng lại (168x194px)";
                    this.customGuildImageUrl = "Custom guild image absolute url (http://...). Image will be resized to 209x232 px.";
                    this.simulate = "Mô phỏng";
                    this.simulating = "Đang mô phỏng...";
                    this.winning = "Cơ hội chiến thắng";
                    this.go = "Giết!!!";
                    this.stop = "Tạm hoãn!";
                    this.quest = "Nhiệm vụ:";
                    this.arena = "Đấu trường:";
                    this.work = "Chùi đít ngựa:";
                    this.completed = "Đã hoàn tất!";
                    this.goldLabel = "Gold";
                    this.winPercentage = "Thống kê chiến thắng:";
                    this.totalEarnedGold = "Thống kê số vàng đã cướp:";
					break;
                      
                default:
                    this.simulationFailed = "Simulation faild! Please try later or select another simulator engine from Gladiatus Tools options.";
                    this.customAvatarImageUrl = "Custom avatar absolute url (http://...). Image will be resized to 168x194 px.";
                    this.customGuildImageUrl = "Custom guild image absolute url (http://...). Image will be resized to 209x232 px.";
                    this.simulate = "Simulate";
                    this.simulating = "Simulating...";
                    this.winning = "Winning ";
                    this.go = "Go!";
                    this.stop = "STOP!";
                    this.quest = "Quest:";
                    this.arena = "Arena:";
                    this.work = "Work:";
                    this.completed = "Complete!";
                    this.goldLabel = "Gold";
                    this.winPercentage = "Winning percentage:";
					this.totalEarnedGold = "Total earned gold:";
            }
        }
    }
};
