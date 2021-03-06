﻿// @name            Gladiatus Tools
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
	confirmBuyout : "",
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
            new Array("Grecia", /s\d+\.gladiatus\.gr/i, "greco"),
            new Array("Ungheria", ".gladiatus.hu", "ungherese"),
            new Array("Indonesia", ".id.gladiatus.com", "indonesiano"),
            new Array("Israele", ".gladiatus.co.il", "ebraico"),
            new Array("Italia", /s\d+\.gladiatus\.it/i, "italiano"),
            new Array("Korea", ".kr.gladiatus.com", "coreano"),
            new Array("Lettonia", /s\d+\.gladiatus\.lv/i, "lettone"),
            new Array("Lituania", /s\d+\.gladiatus\.lt/i, "lituano"),
            new Array("Messico", /s\d+\.gladiatus\.com\.mx/i, "spagnolo"),
            new Array("Paesi Bassi", /s\d+\.gladiatus\.nl/i, "olandese"),
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
					this.confirmBuyout = "Do you really want to buy this object?";
					this.writeGuildmail = "Write guildmail";
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
					this.goldLabel = "Gold";
					this.winPercentage = "Шанс за победа:";
					this.totalEarnedGold = "Всичкото заграбено злато:";
					this.confirmBuyout = "Do you really want to buy this object?";
					this.writeGuildmail = "Write guildmail";
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
					this.goldLabel = "Gold";
                    this.winPercentage = "Procento výher:";
                    this.totalEarnedGold = "Celkem vyděláno zlata:";
					this.confirmBuyout = "Do you really want to buy this object?";
					this.writeGuildmail = "Write guildmail";
                    break; 
            
				case "tedesco":
					this.simulationFailed = "Fehler bei der Simulation! Bitte versuchen Sie es später noch einmal oder wählen Sie eine anderen Simulator Seite von den Einstellungen von Gladiatus Tools.";
					this.customAvatarImageUrl = "Eigenes Avatar Bild URL (http://...). Das Bild wird zu 168x194px verkleinert.";
					this.customGuildImageUrl = "Eigenes Gilden Bild URL (http://...). Das Bild wird zu 209x232px verkleinert.";
					this.simulate = "Simuliere";
					this.simulating = "Simulation erfolgt...";
					this.winning = "Gewinn ";
					this.go = "Los gehts!";
					this.stop = "STOP!";
					this.quest = "Expedition:";
					this.arena = "Arena:";
					this.work = "Arbeit:";
					this.completed = "Fertig!";
					this.goldLabel = "Gold"
					this.winPercentage = "Gewinn Möglichkeit:";
					this.totalEarnedGold = "Das ganz verdiente Gold:";
					this.confirmBuyout = "Wollen Sie wirklich diesen Objekt kaufen?";
					this.writeGuildmail = "Write guildmail";
			
				case "greco":
					this.simulationFailed = "Η προσομοίωση απέτυχε! Παρακαλώ δοκιμάστε αργότερα ή επιλέξτε μια άλλη μηχανή προσομοίωσης από τις επιλογές του Gladiatus Tools.";
					this.customAvatarImageUrl = "Διεύθυνση της επιλεγμένης εικόνας παίχτη (http://...). Η εικόνα θα μετατραπεί σε 168x194.";
					this.customGuildImageUrl = "Διεύθυνση της επιλεγμένης εικόνας τάγματος (http://...). Η εικόνα θα μετατραπεί σε 209x232 px.";
					this.simulate = "Προσομοίωσε";
					this.simulating = "Ανάλυση...";
					this.winning = "Νίκη ";
					this.go = "Πήγαινε!";
					this.stop = "ΣΤΟΠ!";
					this.quest = "Αποστολή:";
					this.arena = "Αρένα:";
					this.work = "Δουλειά:";
					this.completed = "Έγινε!";
					this.goldLabel = "χρυσός";
					this.winPercentage = "Ποσοστό νικών επί τις εκατό:";
					this.totalEarnedGold = "Συνολικός κερδισμένος χρυσός:";
					this.confirmBuyout = "Πραγματικά θέλεις να αγοράσεις αυτό το αντικείμενο";
					this.writeGuildmail = "Write guildmail";
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
					this.confirmBuyout = "Do you really want to buy this object?";
					this.writeGuildmail = "Write guildmail";
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
                    this.work = "Travail:";
                    this.completed = "Terminé!";
                    this.goldLabel = "Or";
                    this.winPercentage = "Pourcentage de victoire:";
                    this.totalEarnedGold = "Bénéfice:";
					this.confirmBuyout = "Voulez-vous vraiment l'acheter ?";
					this.writeGuildmail = "Écrire un message à la guilde";
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
                    this.work = "Lavoro:";
                    this.completed = "Finito!";
                    this.goldLabel = "Oro";
                    this.winPercentage = "Percentuale vittorie:";
                    this.totalEarnedGold = "Oro guadagnato:";
					this.confirmBuyout = "Vuoi veramente acquistare questo oggetto?";
					this.writeGuildmail = "Scrivi un messaggio per la corporazione";
                    break;
                      
				case "lituano":
					this.simulationFailed = "Simuliacija nepavyko! Pamėginkit vėliau ar pasirinkit kitą varikliuką Gladiatus Tools nustatymuose.";
					this.customAvatarImageUrl = "Žaidėjo avatar'o adresas (http://...). Paveiksliuko formatas bus 168x194.";
					this.customGuildImageUrl = "Gildijos avatar'o adresas (http://...). Paveiksliuko formatas bus 209x232 px.";
					this.simulate = "Simuliuoti";
					this.simulating = "Simuliuojama...";
					this.winning = "Tikimybė laimeti ";
					this.go = "Pulk!";
					this.stop = "STOP!";
					this.quest = "Užduotis:";
					this.arena = "Arena:";
					this.work = "Darbas:";
					this.completed = "Įvygdyta!";
					this.goldLabel = "Auksas"
					this.winPercentage = "Laimėjimų procentas:";
					this.totalEarnedGold = "Išvis pelnyta aukso:";
					this.confirmBuyout = "Ar tikrai norite nupirkti šį daiktą?";
					this.writeGuildmail = "Write guildmail";
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
					this.goldLabel = "Gold";
                    this.winPercentage = "Uzvarēto procents:";
                    this.totalEarnedGold = "Arēnā iegūtais zelts:";
					this.confirmBuyout = "Do you really want to buy this object?";
					this.writeGuildmail = "Write guildmail";
					break;
                
                case "olandese":
					this.simulationFailed = "Simulatie mislukt. Probeer het later nog eens of kies een andere simulator in het optiemenu.";
					this.customAvatarImageUrl = "Link naar eigen avatar (http://...). Afbeelding wordt verkleind naar 168x194 px.";
					this.customGuildImageUrl = "Link naar eigen gildelogo (http://...). Afbeelding wordt verkleind naar 209x232 px.";
					this.simulate = "Start Simulatie";
					this.simulating = "Bezig met simulatie...";
					this.winning = "Winkans ";
					this.go = "GO!";
					this.stop = "STOP!";
					this.quest = "Quest:";
					this.arena = "Arena:";
					this.work = "Werk:";
					this.completed = "Gereed";
					this.goldLabel = "Gold";
					this.winPercentage = "Percentage gewonnen:";
					this.totalEarnedGold = "Netto verdiend goud:";
					this.confirmBuyout = "Weet je zeker dat je dit voorwerp wilt kopen?";
					this.writeGuildmail = "Write guildmail";
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
					this.confirmBuyout = "Do you really want to buy this object?";
					this.writeGuildmail = "Write guildmail";
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
					this.confirmBuyout = "Do you really want to buy this object?";
					this.writeGuildmail = "Write guildmail";
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
					this.confirmBuyout = "Do you really want to buy this object?";
					this.writeGuildmail = "Write guildmail";
            }
        }
    }
};