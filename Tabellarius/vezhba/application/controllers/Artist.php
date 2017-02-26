<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Artist extends CI_Controller {

    public function __construct() {
         parent::__construct();
         $this->load->model('Artist_Model');
    }
    
    public function getArtistData ($artistId) {
        $data = $this->Artist_Model->getArtistData($artistId);
        
        $this->load->view('Artist_View', $data);
    }
}
