<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Artist extends CI_Controller {

    public function __construct() {
         parent::__construct();
         //echo $_GET['aid'];
        //$this->load->model('Diskografija_Model');
    }

    public function printMyMsg () {
        echo 'Look at this!';
    }

    public function index()
    {
        echo "Hello World";
        //echo $_GET['aid'];

        /*$this->load->database();

        $artists = $this->db->query('SELECT a.name, a.date, c.name FROM artist as a, country as c WHERE a.country_id=c.id');

        echo "<table>";
        echo "<th>Листа на Артисти</th>";
        echo "<tr><td>Артист</td><td>Година</td><td>Земја</td></tr>";

        foreach ($artists->result() as $row)
        {
            echo "<tr>";
            echo "<td><a href=\"http://www.google.com\">" . $row->name . "</a></td>";
            echo "<td>" . $row->date . "</td>";
            echo "<td>" . $row->name . "</td>";
            echo "</tr>";
        }
        echo "</table>";*/

        //echo 'Total Results: ' . $query->num_rows();

        //$this->load->view('welcome_message');
    }
}
