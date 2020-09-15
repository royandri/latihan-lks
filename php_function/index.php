<!DOCTYPE html>
<html>
<body>

<?php

$array1 = [1, 2, 5, 7];
$array2 = [1, 2, 3, 7];

# Get element than contain in both of array
$result = array_intersect($array1, $array2);

# Get element than only contain in first argument
$result2 = array_diff($array2, $array1);

echo '<pre>',print_r($result,1),'</pre>';
echo '<pre>',print_r($result2,1),'</pre>';

?>

</body>
</html>
