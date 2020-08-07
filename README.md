# Forum Internetowe 

Stack technologiczny MERN:
• MongoDB
• Express
• React
• NodeJS

# Podstawowe funkcjonalności:
• Rejestracja użytkownika - pełna walidacja danych, sprawdzenie duplikatów w bazie, możliwość podglądu wybranego zdjęcia
• Logowanie - opcja przypomnienia hasła, dzięki której możemy następnie je zresetować (wysyłany jest email z linkiem ważnym 10 minut na podaną przez nas skrzynkę pocztową), na potrzeby testowe oraz prezentacyjne używany jest mailtrap, wysyłany jest także JWT
• Przegląd postów na grupach przez niezalogowanych użytkowników
• Dodawanie postów oraz komentarzy/edycja własnych postów oraz ich usuwanie 
• Lajkowanie/odlajkowanie posta
• Przegląd własnego profilu z możliwością edycji niektórych danych
• Możliwość dołączenia do danej grupy (należy dopracować)
• Admin wraz z moderatorami mają możliwość zbanowania użytkowanika, po zablokowaniu użytkownik nie może zalogować się na konto
• Admin może dodać nową grupę do forum

Przykładowa strona:
https://doglovers-dd3c5.web.app/

Z powodu darmowych planów na heroku oraz firebase, działa wolno ale można poznać podstawowe funkcjonalności.

# TODO

• Improve security
• Change profile avatar
• Moderator can ban admin and himself :) (MOST IMPORTANT)
