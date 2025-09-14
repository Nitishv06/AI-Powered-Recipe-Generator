const generateBtn = document.getElementById('generate-btn');
const ingredientsInput = document.getElementById('ingredients-input');
const recipeText = document.getElementById('recipe-text');
const loadingSpinner = document.getElementById('loading-spinner');
const recipeOutput = document.getElementById('recipe-output');

// Replace with your actual API key
// NOTE: For a real project, use a backend to protect your API key.
const API_KEY = "YOUR_API_KEY_HERE"; 

generateBtn.addEventListener('click', async () => {
    const ingredients = ingredientsInput.value.trim();
    if (!ingredients) {
        alert("Please enter some ingredients!");
        return;
    }

    loadingSpinner.style.display = 'block';
    recipeOutput.style.display = 'none';
    
    // Using a placeholder for a large language model API call (e.g., OpenAI or Google Gemini)
    // The actual API endpoint and body may vary.
    const prompt = `Create a recipe using the following ingredients: ${ingredients}. The recipe should include a title, a list of ingredients with quantities, and step-by-step instructions.`;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo-instruct",
                prompt: prompt,
                max_tokens: 500,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const generatedRecipe = data.choices[0].text;
        
        recipeText.textContent = generatedRecipe;
        recipeOutput.style.display = 'block';

    } catch (error) {
        console.error('Error fetching recipe:', error);
        recipeText.textContent = 'Sorry, an error occurred. Please try again.';
    } finally {
        loadingSpinner.style.display = 'none';
    }
});
