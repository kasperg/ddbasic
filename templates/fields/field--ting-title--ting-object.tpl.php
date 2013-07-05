<?php

/**
 * @file field.tpl.php
 * Please add a short description of this file.
 */
?>
<?php foreach ($items as $delta => $item): ?>
  <div class="<?php print $classes; ?>"><?php print render($item); ?></div>
<?php endforeach; ?>
