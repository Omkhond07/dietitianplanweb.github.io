// Close all forms on the Diet page
function closeAllForms() {
    const forms = ['formContainer', 'bmiForm', 'workoutForm', 'outputContainer'];
    forms.forEach(id => {

        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
}

// Reset form fields
function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();  // Reset the form fields
    }
}

// Check for negative values
function validatePositiveNumbers(...values) {
    for (const value of values) {
        if (value < 0) {
            alert('Please enter positive values only.');
            return false;
        }
    }
    return true;
}

// Show the Diet Plan form with a title based on dietType
function showForm(dietType) {
    closeAllForms();
    resetForm('dietForm'); // Reset diet form
    const formContainer = document.getElementById('formContainer');
    const formTitle = document.getElementById('formTitle');
    if (formTitle) formTitle.textContent = `${dietType} Diet Plan`;
    if (formContainer) {
        formContainer.style.display = "block";
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show the BMI Calculator form
function showBmiForm() {
    closeAllForms();
    resetForm('bmiCalculatorForm'); // Reset BMI form
    const bmiForm = document.getElementById('bmiForm');
    if (bmiForm) {
        bmiForm.style.display = "block";
        bmiForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show the Workout Plan form
function showWorkoutForm() {
    closeAllForms();
    resetForm('workoutPlanForm'); // Reset workout plan form
    const workoutForm = document.getElementById('workoutForm');
    if (workoutForm) {
        workoutForm.style.display = "block";
        workoutForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to calculate BMI
function calculateBMI(height, weight) {
    const heightMeters = height / 100;
    return (weight / (heightMeters * heightMeters)).toFixed(1);
}

// Function to generate a diet plan with daily meal rotation
function generateDietPlan(dietType, age, weight, height, activity, goal, diseases, days) {
    // Calculate BMI
    const bmi = calculateBMI(height, weight);

    // Calculate daily calorie needs using Mifflin-St Jeor equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    if (dietType === "Vegan") bmr -= 200; // Adjustment for vegan diet

    // Activity multiplier
    const activityMultipliers = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725
    };

    let calories = bmr * activityMultipliers[activity];

    // Adjust calories based on goal
    if (goal === "weight_loss") calories -= 500;
    else if (goal === "weight_gain") calories += 500;

    // Create base diet plan
    const dietPlan = {
        userDetails: {
            age,
            weight,
            height,
            activity,
            goal,
            diseases,
            days
        },
        overview: {
            bmi,
            dailyCalories: Math.round(calories),
            duration: days,
            restrictions: []
        },
        dailyMeals: [] // Array to store daily meal plans
    };

    // Define meal options for the selected diet type with age and weight restrictions
    const dietPlans = {
        'Low Carb': {
            '9-15': {
                breakfast: ['Scrambled eggs', 'Greek yogurt with berries', 'Poha (flattened rice)', 'Cheese omelet', 'Chia seed pudding'],
                lunch: ['Grilled chicken salad', 'Zucchini noodles with lamb meat', 'Bhakri (millet flatbread) with chutney', 'Vegetable soup', 'Cabbage stir fry'],
                dinner: ['Baked salmon with broccoli', 'Stuffed bell peppers', 'Pithla (gram flour curry) with jowar bhakri', 'Shrimp stir-fry', 'Chicken curry with cauliflower rice'],
                snack: ['Carrot sticks with hummus', 'Mixed nuts', 'Kothimbir vadi (coriander fritters)', 'Hard-boiled eggs', 'Celery with peanut butter'],
            },
            '20-30': {
                breakfast: ['Avocado toast', 'Smoothie with spinach and protein powder', 'Sabudana khichdi (tapioca pearls)', 'Egg muffins with vegetables', 'Protein pancakes'],
                lunch: ['Cauliflower rice stir-fry', 'Turkey lettuce wraps', 'Misal pav (spicy curry with bread)', 'Quinoa salad with black beans', 'Zucchini noodles with pesto'],
                dinner: ['Zucchini lasagna', 'Grilled shrimp with asparagus', 'Paneer tikka (grilled cottage cheese)', 'Stuffed zucchini', 'Chickpea and vegetable curry'],
                snack: ['Celery with peanut butter', 'Cheese slices', 'Dhokla (steamed chickpea cake)', 'Protein bars', 'Fruit with nut butter'],
            },
            '31-45': {
                breakfast: ['Chia seed pudding with almond milk', 'Egg muffins with vegetables', 'Upma (semolina dish)', 'Vegetable frittata', 'Smoothie bowl'],
                lunch: ['Spinach salad with feta and walnuts', 'Egg salad in avocado halves', 'Thalipeeth (multigrain flatbread)', 'Chicken salad', 'Pasta salad with low-carb noodles'],
                dinner: ['Chicken stir-fry with bell peppers', 'Pork tenderloin with green beans', 'Dal fry with chapati', 'Grilled steak with broccoli', 'Vegetable curry'],
                snack: ['Olives and cherry tomatoes', 'Hard-boiled eggs', 'Karanji (sweet dumplings)', 'Guacamole with veggie sticks', 'Almond butter on rice cakes'],
            },
            '46-60': {
                breakfast: ['Cottage cheese with pineapple', 'Zucchini bread (low carb)', 'Aloo poha (potato flattened rice)', 'Greek yogurt with honey', 'Vegetable smoothie'],
                lunch: ['Tuna salad with mixed greens', 'Stuffed bell peppers with quinoa', 'Kadhi (yogurt curry) with rice', 'Chickpea salad', 'Quinoa bowl with vegetables'],
                dinner: ['Beef and vegetable kebabs', 'Mushroom and spinach stuffed chicken', 'Dal fry (spiced lentils) with chapati', 'Fish tacos with lettuce wraps', 'Vegetable stir-fry'],
                snack: ['Cucumber slices with tzatziki', 'Beef jerky', 'Chivda (spiced flattened rice)', 'Mixed nuts', 'Rice cakes with almond butter'],
            },
            '61-75': {
                breakfast: ['Greek yogurt with nuts', 'Smoothie with protein powder', 'Puran poli (sweet flatbread)', 'Oatmeal with chia seeds', 'Avocado toast'],
                lunch: ['Grilled chicken with mixed greens', 'Zucchini noodles with marinara sauce', 'Chikoo salad', 'Egg salad', 'Pasta dish with minimal carbs'],
                dinner: ['Baked fish with asparagus', 'Stuffed bell peppers', 'Vegetable bhaji (mixed vegetable stir-fry)', 'Chicken stir-fry', 'Pork chops with vegetables'],
                snack: ['Carrot sticks with hummus', 'Mixed nuts', 'Bhel puri (puffed rice snack)', 'Greek yogurt with fruit', 'Protein shake'],
            },
            '76-85': {
                breakfast: ['Scrambled eggs with spinach', 'Chia seed pudding', 'Sabudana vada (tapioca fritters)', 'Omelet with mushrooms', 'Vegetable smoothie'],
                lunch: ['Grilled chicken salad', 'Cauliflower rice', 'Pithla bhakri (gram flour curry with flatbread)', 'Fattoush salad', 'Stuffed bell peppers with quinoa'],
                dinner: ['Baked salmon', 'Stir-fried tofu and vegetables', 'Vegetable curry with rice', 'Shrimp tacos', 'Baked chicken with Brussels sprouts'],
                snack: ['Air-popped popcorn', 'Fruit with nut butter', 'Dahi (yogurt) with sugar', 'Protein bar', 'Nuts and seeds mix'],
            },
        },
        'High Protein': {
            '9-15': {
                breakfast: ['Protein pancakes', 'Omelet with mushrooms and cheese', 'Methi thepla (fenugreek flatbread)', 'Greek yogurt with berries', 'Fruit smoothie'],
                lunch: ['Grilled chicken with quinoa', 'Turkey wrap', 'Pav bhaji (vegetable mash with bread)', 'Egg salad sandwich', 'Quinoa salad with vegetables'],
                dinner: ['Beef stir-fry with broccoli', 'Baked fish', 'Chicken curry with rice', 'Stuffed chicken breast', 'Vegetable soup with lentils'],
                snack: ['Cottage cheese', 'Nuts', 'Chikki (peanut brittle)', 'Protein shake', 'Fruit and yogurt parfait'],
            },
            '20-30': {
                breakfast: ['Egg sandwich', 'Protein smoothie', 'Sabudana khichdi (tapioca pearls)', 'Oven baked eggs', 'Fruit and yogurt bowl'],
                lunch: ['Roasted chicken with sweet potatoes', 'Salad with chicken', 'Chickpea salad', 'Tuna salad', 'Vegan protein bowl'],
                dinner: ['Fish tacos', 'Lamb with couscous', 'Paneer tikka (grilled cottage cheese)', 'Stuffed bell peppers', 'Vegetable kebabs'],
                snack: ['Hard-boiled eggs', 'Protein bars', 'Karanji (sweet dumplings)', 'Baked chickpeas', 'Nuts and fruit salad'],
            },
            '31-45': {
                breakfast: ['Breakfast burrito', 'Omelet', 'Protein-packed smoothie', 'Fruit smoothie bowl', 'Chia seed pudding'],
                lunch: ['Chicken noodle soup', 'Mixed green salad', 'Pasta salad with lentils', 'Black bean salad', 'Tuna wrap'],
                dinner: ['Grilled steak', 'Fish tacos', 'Dal tadka (spiced lentils)', 'Vegetable curry with lentils', 'Roasted chicken with veggies'],
                snack: ['Nuts', 'Fruit salad', 'Chivda (spiced flattened rice)', 'Beef jerky', 'Greek yogurt with honey'],
            },
            '46-60': {
                breakfast: ['Eggs with avocado', 'Greek yogurt with honey', 'Curried quinoa', 'Fruit salad', 'Veggie omelet'],
                lunch: ['Chicken salad', 'Broccoli cheddar soup', 'Kadhi (yogurt curry) with rice', 'Split pea salad', 'Turkey spinach salad'],
                dinner: ['Baked salmon with lemon', 'Stir-fried beef', 'Vegetable curry with chapati', 'Stuffed eggplant', 'Chicken thighs with Brussels sprouts'],
                snack: ['Apple with almond butter', 'Carrot sticks', 'Chikki (peanut brittle)', 'Trail mix', 'Rice cakes with peanut butter'],
            },
            '61-75': {
                breakfast: ['Scrambled eggs with spinach', 'Greek yogurt', 'Protein pancakes', 'Sugar-free oatmeal', 'Cottage cheese with fruit'],
                lunch: ['Tuna salad', 'Chicken and avocado bowl', 'Pav bhaji (vegetable mash with bread)', 'Quinoa bowl with lentils', 'Turkey wrap'],
                dinner: ['Grilled vegetables', 'Baked fish', 'Pasta with chicken', 'Vegetable curry with rice', 'Stuffed chicken breast with spinach'],
                snack: ['Trail mix', 'Celery with peanut butter', 'Nuts and seeds', 'Fruit with cheese', 'Protein shake'],
            },
            '76-85': {
                breakfast: ['Eggs with spinach', 'Protein smoothie', 'Fruit-fortified oatmeal', 'Chia pudding', 'Quinoa breakfast bowl'],
                lunch: ['Chicken noodle soup', 'Salad with chickpeas', 'Quinoa salad', 'Egg salad sandwich', 'Vegetable curry with low-carb rice'],
                dinner: ['Meatballs with spaghetti', 'Fish curry with rice', 'Stuffed bell peppers', 'Chicken stir-fry with broccoli', 'Vegetable stir-fry'],
                snack: ['Yogurt with granola', 'Fruit with nut butter', 'Peanut butter snacks', 'Baked sweet potato fries', 'Chikkis (sweet snacks)'],
            },
        },
        'Vegan': {
            '9-15': {
                breakfast: ['Oatmeal with fruits', 'Smoothie bowl', 'Poha (flattened rice)', 'Vegan pancakes', 'Chia seed pudding'],
                lunch: ['Quinoa salad with chickpeas', 'Vegetable soup', 'Misal pav (spicy curry with bread)', 'Vegan burrito', 'Chickpea stew'],
                dinner: ['Vegetable stir-fry', 'Stuffed bell peppers', 'Pithla (gram flour curry) with jowar bhakri', 'Lentil curry', 'Vegan Buddha bowl'],
                snack: ['Hummus with veggies', 'Fruit salad', 'Kothimbir vadi (coriander fritters)', 'Nuts and seeds mix', 'Rice cakes with almond butter'],
            },
            '20-30': {
                breakfast: ['Chia seed pudding', 'Whole grain toast with almond butter', 'Sabudana khichdi (tapioca pearls)', 'Vegan yogurt bowl', 'Fruit smoothie'],
                lunch: ['Caprese salad', 'Stuffed peppers', 'Bhakri (millet flatbread) with chutney', 'Lentil soup', 'Roasted vegetable salad'],
                dinner: ['Pasta primavera', 'Vegetable curry with rice', 'Paneer tikka (grilled cottage cheese)', 'Stuffed acorn squash', 'Vegan tacos'],
                snack: ['Trail mix', 'Rice cakes with avocado', 'Dhokla (steamed chickpea cake)', 'Fruit with nut butter', 'Granola bars'],
            },
            '31-45': {
                breakfast: ['Fruit salad with yogurt', 'Breakfast quinoa with nuts and berries', 'Upma (semolina dish)', 'Smoothie bowl', 'Savory quinoa'],
                lunch: ['Vegetable stir-fry with tofu', 'Chickpea salad', 'Thalipeeth (multigrain flatbread)', 'Lentil salad', 'Buddha bowl'],
                dinner: ['Mushroom risotto', 'Lentil curry', 'Stuffedportobello mushrooms', 'Vegetable curry', 'Vegan pizza'],
                snack: ['Nut butter on apple slices', 'Yogurt with granola', 'Chivda (spiced flattened rice)', 'Fruit salsa', 'Baked sweet potato wedges'],
            },
            '46-60': {
                breakfast: ['Overnight oats with fruits', 'Banana pancakes', 'Aloo poha (potato flattened rice)', 'Fruit and nut parfait', 'Tofu scramble'],
                lunch: ['Vegetable curry with brown rice', 'Legume salad', 'Kadhi (yogurt curry) with rice', 'Quinoa salad', 'Vegan sushi'],
                dinner: ['Stuffed acorn squash', 'Vegetable stir-fry', 'Dal fry (spiced lentils) with chapati', 'Stir-fried rice with vegetables', 'Chickpea curry'],
                snack: ['Fruit cup', 'Dark chocolate', 'Bhel puri (puffed rice snack)', 'Salsa with tortilla chips', 'Coconut yogurt'],
            },
            '61-75': {
                breakfast: ['Smoothie with spinach', 'Chia seed pudding', 'Puran poli (sweet flatbread)', 'Savory oatmeal', 'Protein smoothie'],
                lunch: ['Hummus and veggie wrap', 'Chickpea salad', 'Chickpea curry with rice', 'Quinoa bowl', 'Vegetable soup'],
                dinner: ['Vegetable lasagna', 'Quinoa with vegetables', 'Vegetable curry with chapati', 'Stuffed peppers', 'Roasted vegetable casserole'],
                snack: ['Fruit and nut mix', 'Veggie sticks with hummus', 'Dahi (yogurt) with sugar', 'Fruit salad', 'Granola bar'],
            },
            '76-85': {
                breakfast: ['Fruit and nut granola', 'Smoothie bowl', 'Sabudana vada (tapioca fritters)', 'Muesli with nuts', 'Savory pancakes'],
                lunch: ['Vegetable stir-fry', 'Chickpea salad', 'Pav bhaji (vegetable mash with bread)', 'Lentil salad', 'Stuffed flatbread'],
                dinner: ['Stuffed peppers', 'Vegetable curry', 'Baingan bharta (smoky eggplant mash)', 'Chickpea stew', 'Vegan chili'],
                snack: ['Yogurt with fruits', 'Veggies and hummus', 'Chikki (peanut brittle)', 'Protein balls', 'Rice cakes with almond butter'],
            },
        },
        'Non Veg': {
            '9-15': {
                breakfast: ['Bacon and eggs', 'Fruit smoothie', 'Methi thepla (fenugreek flatbread)', 'Fluffy omelet', 'Protein pancakes'],
                lunch: ['Chicken Caesar salad', 'Turkey wrap', 'Pav bhaji (vegetable mash with bread)', 'Mini burger', 'Chicken sandwich'],
                dinner: ['Grilled fish with rice', 'Pasta with meatballs', 'Chicken curry with rice', 'Stir-fried beef', 'Roasted chicken with vegetables'],
                snack: ['Yogurt with honey', 'Nuts', 'Chikki (peanut brittle)', 'Protein bar', 'Fruit and cheese'],
            },
            '20-30': {
                breakfast: ['Egg sandwich', 'Protein smoothie', 'Fluffy omelet with cheese', 'Breakfast burrito', 'Greek yogurt'],
                lunch: ['Roasted chicken with sweet potatoes', 'Salad with chicken', 'Chicken kebabs', 'Grilled chicken wrap', 'Tuna salad'],
                dinner: ['Fish tacos', 'Lamb with couscous', 'Grilled chicken with vegetables', 'Beef stew', 'Pasta with chicken'],
                snack: ['Hard-boiled eggs', 'Protein bars', 'Karanji (sweet dumplings)', 'Nuts', 'Fruit salad'],
            },
            '31-45': {
                breakfast: ['Breakfast burrito', 'Eggs and avocado', 'Scrambled eggs', 'Protein smoothie', 'Overnight oats'],
                lunch: ['Salad with grilled chicken', 'Chicken noodle soup', 'Tuna salad', 'Quinoa bowl', 'Grilled steak salad'],
                dinner: ['Baked salmon', 'Chicken stir-fry', 'Vegetable curry with chicken', 'Beef and broccoli', 'Stuffed chicken breast'],
                snack: ['Nuts', 'Fruit salad', 'Chivda (spiced flattened rice)', 'Edamame', 'Greek yogurt'],
            },
            '46-60': {
                breakfast: ['Eggs with avocado', 'Greek yogurt with honey', 'Protein pancakes', 'Fluffy omelet', 'Chia pudding'],
                lunch: ['Chicken salad', 'Broccoli cheddar soup', 'Kadhi (yogurt curry) with rice', 'Chicken wraps', 'Roasted veggie and chicken salad'],
                dinner: ['Grilled salmon with vegetables', 'Beef stir-fry', 'Vegetable curry with chicken', 'Pasta with chicken', 'Vegetable soup with turkey'],
                snack: ['Apple with almond butter', 'Carrot sticks', 'Peanut butter energy balls', 'Protein shake', 'Cottage cheese with pineapple'],
            },
            '61-75': {
                breakfast: ['Scrambled eggs with spinach', 'Greek yogurt', 'Protein pancakes', 'Fruit smoothie', 'Savory oatmeal'],
                lunch: ['Tuna salad', 'Chicken and avocado bowl', 'Pasta salad with chicken', 'Meatball sandwich', 'Quinoa salad with chicken'],
                dinner: ['Grilled chicken with vegetables', 'Zucchini noodles with meatballs', 'Stuffed bell peppers with turkey', 'Fish taco', 'Roasted chicken with Brussels sprouts'],
                snack: ['Trail mix', 'Celery with peanut butter', 'Nuts', 'Fruit with cheese', 'Greek yogurt with honey'],
            },
            '76-85': {
                breakfast: ['Protein pancakes', 'Smoothie with protein powder', 'Fluffy omelet', 'Scrambled eggs with cheese', 'Fruit and nut granola'],
                lunch: ['Chicken noodle soup', 'Mixed green salad with turkey', 'Chicken burrito', 'Quinoa salad with grilled chicken', 'Vegetable curry with chicken'],
                dinner: ['Grilled fish', 'Stuffed bell peppers with ground turkey', 'Beef tacos', 'Boiled chicken with vegetables', 'Baked salmon with quinoa'],
                snack: ['Yogurt with granola', 'Fruit with nut butter', 'Protein bars', 'Nuts and cheese', 'Granola with honey'],
            },
        },
    };

    const ageGroup = getAgeGroup(age);
    const mealOptions = dietPlans[dietType][ageGroup];

    // Generate daily meal plans for the selected duration
    for (let day = 1; day <= days; day++) {
        const meals = {
            day,
            breakfast: mealOptions.breakfast[(day - 1) % mealOptions.breakfast.length],
            lunch: mealOptions.lunch[(day - 1) % mealOptions.lunch.length],
            dinner: mealOptions.dinner[(day - 1) % mealOptions.dinner.length],
            snack: mealOptions.snack[(day - 1) % mealOptions.snack.length]
        };
        dietPlan.dailyMeals.push(meals);
    }

    // Apply medical restrictions
    if (diseases !== 'none') {
        switch (diseases) {
            case 'diabetes':
                dietPlan.overview.restrictions.push('Low sugar options');
                dietPlan.dailyMeals.forEach(day => {
                    day.snack = 'Mixed nuts (no added sugar)';
                    day.lunch = day.lunch.replace('fruit', 'berries'); // Replace fruit with berries
                    day.dinner = day.dinner.replace('pasta', 'zucchini noodles'); // Replace pasta with zucchini noodles
                    // Additional restrictions
                    day.breakfast = day.breakfast.replace('honey', 'stevia'); // Replace honey with stevia
                });
                break;
            case 'heart_disease':
                dietPlan.overview.restrictions.push('Low sodium, low saturated fat');
                dietPlan.dailyMeals.forEach(day => {
                    day.dinner = day.dinner.replace('salmon', 'skinless chicken breast');
                    day.lunch = day.lunch.replace('cheese', 'avocado'); // Replace cheese with avocado
                    day.snack = 'Carrot sticks with hummus'; // Healthy snack
                    // Additional restrictions
                    day.breakfast = day.breakfast.replace('bacon', 'turkey bacon'); // Replace bacon with turkey bacon
                });
                break;
            case 'cancer':
                dietPlan.overview.restrictions.push('High antioxidant foods');
                dietPlan.dailyMeals.forEach(day => {
                    day.snack += ' + Blueberries';
                    day.lunch = day.lunch.replace('chicken', 'quinoa salad'); // Replace chicken with quinoa salad
                    day.dinner = day.dinner.replace('beef', 'tofu stir-fry'); // Replace beef with tofu stir-fry
                    // Additional restrictions
                    day.breakfast = day.breakfast.replace('yogurt', 'coconut yogurt'); // Replace yogurt with coconut yogurt
                });
                break;
            case 'orthopedic':
                dietPlan.overview.restrictions.push('Calcium-rich foods');
                dietPlan.dailyMeals.forEach(day => {
                    day.breakfast += ' with fortified cereal';
                    day.lunch = day.lunch.replace('salad', 'kale salad'); // Replace salad with kale salad
                    day.snack = 'Greek yogurt with honey'; // Calcium-rich snack
                    // Additional restrictions
                    day.dinner = day.dinner.replace('chicken', 'tofu'); // Replace chicken with tofu for calcium
                });
                break;
            case 'gluten_intolerance':
                dietPlan.overview.restrictions.push('Gluten-free options');
                dietPlan.dailyMeals.forEach(day => {
                    day.lunch = day.lunch.replace('bread', 'gluten-free bread'); // Replace bread with gluten-free bread
                    day.dinner = day.dinner.replace('pasta', 'quinoa'); // Replace pasta with quinoa
                    day.snack = 'Rice cakes with almond butter'; // Gluten-free snack
                    // Additional restrictions
                    day.breakfast = day.breakfast.replace('oats', 'gluten-free oats'); // Replace oats with gluten-free oats
                });
                break;
            case 'lactose_intolerance':
                dietPlan.overview.restrictions.push('Lactose-free options');
                dietPlan.dailyMeals.forEach(day => {
                    day.breakfast = day.breakfast.replace('yogurt', 'coconut yogurt'); // Replace yogurt with coconut yogurt
                    day.lunch = day.lunch.replace('cheese', 'nut cheese'); // Replace cheese with nut cheese
                    day.snack = 'Almonds or walnuts'; // Lactose-free snack
                    // Additional restrictions
                    day.dinner = day.dinner.replace('cream', 'coconut cream'); // Replace cream with coconut cream
                });
                break;
        }
    }

    // Apply goal-based restrictions
    switch (goal) {
        case 'weight_loss':
            dietPlan.overview.restrictions.push('Calorie deficit foods');
            dietPlan.dailyMeals.forEach(day => {
                day.lunch = day.lunch.replace('pasta', 'zucchini noodles'); // Replace pasta with zucchini noodles
                day.dinner = day.dinner.replace('rice', 'cauliflower rice'); // Replace rice with cauliflower rice
                day.snack = 'Vegetable sticks with hummus'; // Healthy snack
                // Additional restrictions
                day.breakfast = day.breakfast.replace('high-calorie', 'low-calorie'); // Replace high-calorie with low-calorie
            });
            break;
        case 'weight_gain':
            dietPlan.overview.restrictions.push('High-calorie foods');
            dietPlan.dailyMeals.forEach(day => {
                day.lunch = day.lunch.replace('salad', 'quinoa salad with nuts'); // Add nuts for calories
                day.dinner = day.dinner.replace('chicken', 'chicken with olive oil'); // Add olive oil for calories
                day.snack = 'Nut butter on whole grain bread'; // High-calorie snack
                // Additional restrictions
                day.breakfast = day.breakfast.replace('low-fat', 'regular'); // Use regular options
            });
            break;
        case 'maintain_weight':
            dietPlan.overview.restrictions.push('Balanced meals');
            dietPlan.dailyMeals.forEach(day => {
                day.lunch = day.lunch.replace('low-fat', 'regular'); // Use regular options
                day.dinner = day.dinner.replace('light', 'regular'); // Use regular options
                day.snack = 'Fruit with yogurt'; // Balanced snack
                // Additional restrictions
                day.breakfast = day.breakfast.replace('sugar', 'honey'); // Replace sugar with honey
            });
            break;
    }

    // Apply activity level-based restrictions
    switch (activity) {
        case 'sedentary':
            dietPlan.overview.restrictions.push('Low-calorie options');
            dietPlan.dailyMeals.forEach(day => {
                day.lunch = day.lunch.replace('high-calorie', 'low-calorie'); // Replace high-calorie with low-calorie
                day.dinner = day.dinner.replace('heavy', 'light'); // Replace heavy with light
                day.snack = 'Air-popped popcorn'; // Light snack
                // Additional restrictions
                day.breakfast = day.breakfast.replace('butter', 'olive oil'); // Replace butter with olive oil
            });
            break;
        case 'lightly_active':
            dietPlan.overview.restrictions.push('Moderate-calorie options');
            dietPlan.dailyMeals.forEach(day => {
                day.lunch = day.lunch.replace('light', 'moderate'); // Use moderate options
                day.dinner = day.dinner.replace('heavy', 'moderate'); // Use moderate options
                day.snack = 'Greek yogurt with honey'; // Moderate snack
                // Additional restrictions
                day.breakfast = day.breakfast.replace('sugar', 'honey'); // Replace sugar with honey
            });
            break;
        case 'moderately_active':
            dietPlan.overview.restrictions.push('Balanced meals');
            dietPlan.dailyMeals.forEach(day => {
                day.lunch = day.lunch.replace('low-fat', 'regular'); // Use regular options
                day.dinner = day.dinner.replace('light', 'regular'); // Use regular options
                day.snack = 'Fruit with nut butter'; // Balanced snack
                // Additional restrictions
                day.breakfast = day.breakfast.replace('high-calorie', 'moderate-calorie'); // Replace high-calorie with moderate-calorie
            });
            break;
        case 'very_active':
            dietPlan.overview.restrictions.push('High-calorie options');
            dietPlan.dailyMeals.forEach(day => {
                day.lunch = day.lunch.replace('low-calorie', 'high-calorie'); // Replace low-calorie with high-calorie
                day.dinner = day.dinner.replace('light', 'heavy'); // Replace light with heavy
                day.snack = 'Protein shake'; // High-calorie snack
                // Additional restrictions
                day.breakfast = day.breakfast.replace('low-fat', 'regular'); // Use regular options
            });
            break;
    }

    return dietPlan;
}

// Function to download output as an HTML file
function downloadOutput(content, fileName) {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event Listeners for Form Submissions

// Handle Diet Plan form submission
document.getElementById('dietForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const dietType = document.getElementById('formTitle').textContent.replace(' Diet Plan', '');
    const age = parseInt(document.getElementById('age').value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    const diseases = document.getElementById('diseases').value;
    const days = parseInt(document.getElementById('days').value);

    // Validate input values
    if (!validatePositiveNumbers(age, height, weight, days)) return;

    const plan = generateDietPlan(dietType, age, weight, height, activity, goal, diseases, days);

    // Build output HTML
    let outputHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${dietType} Diet Plan</title>
            <style>
                body { font-family: Arial, sans-serif; }
                h3 { color: #333; }
                .user-details, .plan-overview { margin: 20px 0; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 10px; border: 1px solid #ddd; }
                th { background-color: #f2f2f2; }
                </style>
        </head>
        <body>
            <h3>${dietType} Diet Plan (${days} Days)</h3>
            <div class="user-details">
              <h4>User Details:</h4>
              <p><strong>Age:</strong> ${plan.userDetails.age}</p>
              <p><strong>Weight:</strong> ${plan.userDetails.weight} kg</p>
              <p><strong>Height:</strong> ${plan.userDetails.height} cm</p>
              <p><strong>Activity Level:</strong> ${plan.userDetails.activity.replace('_', ' ')}</p>
              <p><strong>Goal:</strong> ${plan.userDetails.goal.replace('_', ' ')}</p>
              <p><strong>Medical Conditions:</strong> ${plan.userDetails.diseases === 'none' ? 'None' : plan.userDetails.diseases}</p>
              <p><strong>Plan Duration:</strong> ${plan.userDetails.days} Days</p>
            </div>
            <div class="plan-overview">
              <h4>Plan Overview:</h4>
              <p><strong>BMI:</strong> ${plan.overview.bmi}</p>
              <p><strong>Daily Calories:</strong> ${plan.overview.dailyCalories}</p>
              ${plan.overview.restrictions.length ?
                `<p><strong>Restrictions:</strong> ${plan.overview.restrictions.join(', ')}</p>` : ''}
            </div>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Dinner</th>
                  <th>Snack</th>
                </tr>
              </thead>
              <tbody>
      `;

    // Add daily meal plans
    plan.dailyMeals.forEach(day => {
        outputHTML += `
              <tr>
                <td>Day ${day.day}</td>
                <td>${day.breakfast}</td>
                <td>${day.lunch}</td>
                <td>${day.dinner}</td>
                <td>${day.snack}</td>
              </tr>
            `;
    });

    outputHTML += `
            </tbody>
          </table>
          </body>
        </html>
          `;

    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = outputHTML;
    outputContainer.style.display = 'block';
    outputContainer.scrollIntoView({ behavior: 'smooth' });

    // Add download button
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Plan';
    downloadButton.addEventListener('click', () => {
        downloadOutput(outputHTML, `${dietType}_Diet_Plan.html`);
    });
    outputContainer.appendChild(downloadButton);
});

// Handle BMI Calculator form submission
document.getElementById('bmiCalculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const heightBmi = parseInt(document.getElementById('heightBmi').value);
    const weightBmi = parseInt(document.getElementById('weightBmi').value);

    // Validate input values
    if (!validatePositiveNumbers(heightBmi, weightBmi)) return;

    const bmi = calculateBMI(heightBmi, weightBmi);

    // Display the calculated BMI in the outputContainer
    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = `
        <h3>BMI Result</h3>
        <p><strong>Your BMI is:</strong> ${bmi}</p>
        <p><strong>Weight Status:</strong> ${getBMIStatus(bmi)}</p>
    `;
    outputContainer.style.display = 'block';
    outputContainer.scrollIntoView({ behavior: 'smooth' });

    // Add download button
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download BMI Result';
    downloadButton.addEventListener('click', () => {
        const content = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>BMI Result</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h3 { color: #333; }
                </style>
            </head>
            <body>
                <h3>BMI Result</h3>
                <p><strong>Your BMI is:</strong> ${bmi}</p>
                <p><strong>Weight Status:</strong> ${getBMIStatus(bmi)}</p>
            </body>
            </html>
        `;
        downloadOutput(content, 'BMI_Result.html');
    });
    outputContainer.appendChild(downloadButton);
});

// Function to determine BMI status based on BMI value
function getBMIStatus(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obesity';
}

// Handle Workout Plan form submission
document.getElementById('workoutPlanForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const goal = document.getElementById('workoutGoal').value;
    const days = parseInt(document.getElementById('workoutDays').value);

    if (!validatePositiveNumbers(days)) return;

    const workoutPlan = generateWorkoutPlan(goal, days);

    // Build output HTML
    let outputHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Workout Plan</title>
            <style>
                body { font-family: Arial, sans-serif; }
                h3 { color: #333; }
            </style>
        </head>
        <body>
            <h3>Workout Plan (${days} Days)</h3>
            <p><strong>Goal:</strong> ${goal.replace('_', ' ')}</p>
            <p><strong>Duration:</strong> ${days} Days </p>
    `;

    // Add daily workout plans
    workoutPlan.plan.forEach((workout) => {
        outputHTML += `
            <h4>Day ${workout.day}</h4>
            <p><strong>Type:</strong> ${workout.type}</p>
            <p><strong>Exercise:</strong> ${workout.exercise.name}</p>
            <img src="${workout.exercise.image}" alt="${workout.exercise.name}" style="max-width: 200px;">
            <p><strong>Description:</strong> ${workout.exercise.description}</p>
        `;
    });

    outputHTML += `
        </body>
        </html>
    `;

    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = outputHTML;
    outputContainer.style.display = 'block';
    outputContainer.scrollIntoView({ behavior: 'smooth' });

    // Add download button
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Workout Plan';
    downloadButton.addEventListener('click', () => {
        downloadOutput(outputHTML, 'Workout_Plan.html');
    });
    outputContainer.appendChild(downloadButton);
});

// Attach click event listeners to diet images
const dietImages = document.querySelectorAll('.diet-image');
dietImages.forEach(image => {
    image.addEventListener('click', function () {
        const dietType = this.dataset.dietType;
        if (dietType) {
            showForm(dietType);
        }
    });
});

// Function to generate workout plan
function generateWorkoutPlan(goal, days) {
    const workoutPlan = {
        duration: days,
        plan: []
    };

    const cardioExercises = [
        {
            name: 'Running',
            image: 'https://media.istockphoto.com/id/1156642330/photo/large-group-of-multi-generation-people-running-a-race-competition-in-nature.jpg?s=2048x2048&w=is&k=20&c=dXvlv3xv2FDz8kDE0LP2LnD6maMOWLmBeTanwIjbtNY=',
            description: 'Jog or run at a moderate pace.'
        },
        {
            name: 'Cycling',
            image: 'https://media.istockphoto.com/id/1393158359/photo/asian-chinese-man-cycling-in-the-city-on-bicycle-lane-to-work-sustainability-lifestyle.jpg?s=2048x2048&w=is&k=20&c=gz0-i02gigAcPluQOE1No0NUraF-HNmuGGvRdUYemvk=',
            description: 'Cycle on a stationary bike or outdoors.'
        },
        {
            name: 'Swimming',
            image: 'https://media.istockphoto.com/id/1332857654/photo/aerial-top-view-male-swimmer-swimming-in-swimming-pool-professional-determined-athlete.jpg?s=612x612&w=0&k=20&c=CgYpYSnrCqUx1z-lgYOk45wBI3sr3cE-dR4J4cZ0dWw=',
            description: 'Swim laps.'
        }
    ];

    const strengthExercises = [
        {
            name: 'Squats',
            image: 'https://media.istockphoto.com/id/1396727797/photo/athletic-couple-doing-kettlebell-goblet-squat-exercise-during-cross-training-in-a-gym.jpg?s=612x612&w=0&k=20&c=vlJmg-KyO4ooxbSGP92uinbXCEOGxhOMotzQAB9u-Rw=',
            description: 'Stand with feet shoulder-width apart, lower your hips as if sitting in a chair, then stand back up.'
        },
        {
            name: 'Push-ups',
            image: 'https://media.istockphoto.com/id/1094479308/photo/bi-racial-man-doing-push-ups-in-sportswear-on-fitness-mat.jpg?s=612x612&w=0&k=20&c=3W7yb-IRh0FmuIv9CDF9OfTXRTogZn6GyDitfpRVA1I=',
            description: 'Place hands on the ground, lower your body until your chest touches the ground, then push back up.'
        },
        {
            name: 'Bench Press',
            image: 'https://media.istockphoto.com/id/468823878/photo/young-man-doing-bench-press-workout-in-gym.jpg?s=2048x2048&w=is&k=20&c=agsMy83hCxG_5vqVDEVPMHuJk7_iSvoQHj6HCdQKlhg=',
            description: 'Lie on a bench, lower the bar to your chest, and push it back up.'
        }
    ];

    const hiitExercises = [
        {
            name: 'Burpees',
            image: 'https://media.istockphoto.com/id/1214775287/photo/bodybuilder-man-does-the-cardio-exercise-jumping-on-a-wooden-box-in-the-gym-sport-concept-fat.jpg?s=612x612&w=0&k=20&c=0sm9q1p0OyoBo3QngxaMIhPLhkwvluQkATKxZfbL7Uw=',
            description: 'Start standing, drop into a squat, kick your feet back into a plank, do a push-up, jump your feet forward, and jump up.'
        },
        {
            name: 'Jumping Jacks',
            image: 'https://media.istockphoto.com/id/697893538/photo/happy-man-and-woman-jumping-outdoors.jpg?s=612x612&w=0&k=20&c=K_wCTRHMP708Wf6kH0ogBXuojb8b9nhw1nrc5_m9ZVc=',
            description: 'Jump with your feet apart and arms overhead, then jump back to the starting position.'
        },
        {
            name: 'Mountain Climbers',
            image: 'https://media.istockphoto.com/id/471200040/photo/extreme-rappelling.jpg?s=612x612&w=0&k=20&c=cPX38qH1u0fZZ58zPkOqcrJbiCtDQZq71VqGIYTXH2A=',
            description: 'Start in a plank position, bring one knee towards your chest, then alternate legs as if climbing a mountain.'
        }
    ];

    // Generate daily workouts based on goal
    for (let day = 1; day <= days; day++) {
        let workout;
        if (goal === 'weight_loss') {
            workout = cardioExercises[(day - 1) % cardioExercises.length];
        } else if (goal === 'muscle_gain') {
            workout = strengthExercises[(day - 1) % strengthExercises.length];
        } else {
            workout = hiitExercises[(day - 1) % hiitExercises.length];
        }

        workoutPlan.plan.push({
            day,
            type: goal === 'weight_loss' ? 'Cardio' : (goal === 'muscle_gain' ? 'Strength' : 'HIIT'),
            exercise: workout
        });
    }

    return workoutPlan;
}

// Function to get age group based on age
function getAgeGroup(age) {
    if (age >= 9 && age <= 15) return '9-15';
    if (age >= 20 && age <= 30) return '20-30';
    if (age >= 31 && age <= 45) return '31-45';
    if (age >= 46 && age <= 60) return '46-60';
    if (age >= 61 && age <= 75) return '61-75';
    return '76-85';
}

// Function to get weight group based on weight
function getWeightGroup(weight) {
    if (weight < 50) return 'under_50';
    if (weight >= 50 && weight < 70) return '50-70';
    if (weight >= 70 && weight < 90) return '70-90';
    return 'over_90';
}

