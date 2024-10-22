const API_KEY = "910bb2fa28844be8b6cec2b9d69c1c56";  // Spoonacular API anahtarı
const recipeListEl = document.getElementById("recipe-list");  // Tarifi ekleyeceğimiz liste elemanı

// Tarifleri ekrana basan fonksiyon
function displayRecipes(recipes) {
    recipeListEl.innerHTML = "";  // Önce mevcut içerikleri temizliyoruz
    recipes.forEach((recipe) => {
        const recipeItemEl = document.createElement("li");  // Liste öğesi (li) oluşturuyoruz
        recipeItemEl.classList.add("recipe-item");

        const recipeImageEl = document.createElement("img");  // Resim öğesi
        recipeImageEl.src = recipe.image;  // Resim URL'si API'den geliyor
        recipeImageEl.alt = "Recipe image";  // Alternatif metin

        const recipeTitleEl = document.createElement("h2");  // Tarif başlığı (h2)
        recipeTitleEl.textContent = recipe.title;  // API'den gelen başlık verisi

        const recipeDescriptionEl = document.createElement("p");  // Tarif açıklaması (p)
        recipeDescriptionEl.innerHTML = `<strong>Ingredients:</strong> ${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(",")}`;

        const recipeLinkEl = document.createElement("a");  // Tarif detaylarına giden link
        recipeLinkEl.href = recipe.sourceUrl;  // Kaynak URL'si API'den alınıyor
        recipeLinkEl.textContent = "View Recipe";  // Link metni

        // Her bir öğeyi liste öğesine ekliyoruz
        recipeItemEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeDescriptionEl);
        recipeItemEl.appendChild(recipeLinkEl);

        // Son olarak bu tarifi listeye ekliyoruz
        recipeListEl.appendChild(recipeItemEl);
    });
}

// API'den tarifleri alan fonksiyon
async function getRecipes() {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);
        const data = await response.json();  // JSON formatında yanıtı işliyoruz
        return data.recipes;  // recipes kısmını döndürüyoruz
    } catch (error) {
        console.error("API'den veri alınırken hata oluştu:", error);  // Hata yakalıyoruz
        return [];
    }
}

// Uygulama başlatıcı fonksiyon
async function init() {
    const recipes = await getRecipes();  // Tarifleri API'den alıyoruz
    console.log(recipes);  // Tarifleri konsola yazdırarak kontrol edelim
    displayRecipes(recipes);  // Tarifleri ekrana basıyoruz
}

// Sayfa yüklendiğinde init fonksiyonunu çağırıyoruz
init();



