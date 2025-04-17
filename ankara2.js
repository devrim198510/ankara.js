window.onload = function() {
    document.body.innerHTML = "<p>Yükleniyor...</p>";

    fetch("https://ipinfo.io/json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Ağ hatası oluştu');
            }
            return response.json();
        })
        .then(data => {
            const userCountry = data.country;
            const userIP = data.ip;

            if (userCountry === "TR") {
                document.body.innerHTML = `
                    <h1>Türkiye'desiniz!</h1>
                    <p>Yönlendiriliyorsunuz...</p>
                    <p>IP Bilginiz: ${userIP}</p>
                `;
                window.location.href = redirectURL;
            } else {
                document.body.innerHTML = `
                    <h1>Hoş Geldiniz!</h1>
                    <p>Bu içerik sadece Türkiye'deki kullanıcılar için mevcuttur.</p>
                    <p>IP Bilginiz: ${userIP}</p>
                    <p>Ülkeniz: ${userCountry}</p>
                `;
            }
        })
        .catch(error => {
            console.error("Konum bilgisi alınamadı: ", error);
            document.body.innerHTML = "<p>Konum bilgisi alınamadı. Lütfen tekrar deneyin.</p>";
        });
};
