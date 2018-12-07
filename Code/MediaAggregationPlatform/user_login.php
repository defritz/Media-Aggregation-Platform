<?php
if ( $result->num_rows == 0 ){
    $_SESSION['text'] = "email or password is incorrect!";
    header("location: error.php");}
else {
    $user = $result->fetch_assoc();

    if ( password_verify($_POST['password'], $user['password']) ) {
        
        $_SESSION['email'] = $user['email'];


		$_SESSION['logged_in'] = true;
		header("location: profile.php");
    }
    else {
        $_SESSION['text'] = "email or password is incorrect!";
        header("location: error.php");
    }
}

