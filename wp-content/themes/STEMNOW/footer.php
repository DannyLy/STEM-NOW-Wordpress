<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 */
?>
	</div><!-- #main .wrapper -->
	<div id="footer-sidebar" class="secondary">
<div id="footer-sidebar1">
<?php
if(is_active_sidebar('footer-sidebar-1')){
dynamic_sidebar('footer-sidebar-1');
}
?>

</div>
</div>
	
</div><!-- #page -->
 <?php logo_slider(); ?>
<?php wp_footer(); ?>
</body>

</html>