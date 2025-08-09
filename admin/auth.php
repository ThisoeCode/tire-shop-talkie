<?php
session_start();
if(!($_SESSION['logged_in'] ?? false)){
  header('Location: /admin/login?goto='.$goto);
  die;
}