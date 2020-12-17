<?php
# Remember to set this at the top of your PHP files!
error_reporting(E_ALL);

# Example Output:
 
# Mowgli's Muffin
# Recipe:
# In a bowl, mix:
#   1 Oreo
#   1 gallon of Water
#   1 oz of Green peas
#   1 Lentil
#   1 Ice cube
# 
# Cook for 6 minutes and serve!

header("Content-type: text/plain");
if(isset($_GET["name"]) && $_GET["name"] != "")
{
    $name = $_GET["name"];
    generate_recipe($name);
}
else
{
    header("HTTP/1.1 400 Invalid Request");
    echo "Missing required name parameter!";
}
# 2. Remember to set the content-type for each web service! This web service outputs plain txt.

# Finish this "main function" to generate the entire recipe. Pass in your query parameter value
# to this function. Use helper functions to factor out meaningful behavior!
function generate_recipe($name) {
  # 3. Generate a recipe name with the first letter in the name parameter using the file in foods/
  # corresponding to the first letter. Print the recipe name on a new line.
  generate_recipe_name($name);
  # 4. Print intermediate text to introduce directions and ingredient list.
  output_ingredient_intro();
  # 5. Generate a list of ingredients for each letter in the name (each on a new line)
  generate_ingredients($name);
  # 6. Print final step based on name length (see spec).
  $name_length = strlen($name);
  echo "Cook for {$name_length} minutes and serve!";
}


function generate_recipe_name($name) {
  $food = get_random_line_from_letter("foods",$name[0]);
  echo "{$name}'s {$food}";
}

function generate_ingredients($name) {
  $name_length = strlen($name);
  for ($i = 1; $i < $name_length; $i++) { 
    $ingredient = get_random_line_from_letter("ingredients",$name[$i]);
    echo "  {$ingredient}";
  }
  print ("\n");
}

# (PROVIDED HELPER FUNCTIONS)
# ==================================================================================== #

# Outputs intermediate text in a recipe, introducing directions and ingredients.
function output_ingredient_intro() {
  print ("\n");
  print ("Directions:\n");
  print ("In a bowl, mix:\n");
}

# Returns a random line from the txt file corresponding to the letter and folder name.
# Pre: $letter is a single alphabetical letter
function get_random_line_from_letter($folder_name, $letter) {
  $choices = file("./{$folder_name}/{$letter}.txt");
  # array_rand is a function that returns a random element from an array
  return $choices[array_rand($choices)];
}
?>
