<?php
    class Diskografija_Model extends CI_Model {

        public function getArtists() {
            $this->load->database();
            $this->load->helper('url');

            $query = 'SELECT a.id as aid, a.name as aName, a.date as aDate, c.name as cName FROM artist as a, country as c WHERE a.country_id=c.id';
            $artists = $this->db->query($query);

            return $artists;
        }
    }
?>