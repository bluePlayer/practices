<?php
    class Artist_Model extends CI_Model {

        public function getArtistData($artistId) {
            $this->load->database();
            $this->load->helper('url');

            $artistQuery = 'SELECT a.id as aid, a.name as aName, a.date as aDate, a.short_bio as shortBio, c.name as cName FROM artist as a, country as c WHERE a.country_id=c.id and a.id=' . $artistId;
            $artistData = $this->db->query($artistQuery);
            
            $albumsQuery = 'SELECT * FROM album WHERE artist_id=' . $artistId;
            $albumsData = $this->db->query($albumsQuery);
            
            $data = array();
            $artist = $artistData->result();
            $albums = $albumsData->result();

            $data['artistId'] = $artist[0]->aid;
            $data['artistName'] = $artist[0]->aName;
            $data['dateActive'] = $artist[0]->aDate;
            $data['countryName'] = $artist[0]->cName;
            $data['artistBio'] = $artist[0]->shortBio;
            $data['artistDataNumRows'] = $artistData->num_rows();
            $data['albums'] = $albums;
            $data['albumsDataNumRows'] = $albumsData->num_rows();
            
            $albumSongCountArray = array();
            
            for ($i = 0; $i < $data['albumsDataNumRows']; $i += 1) {
                $songCountQuery = 'SELECT COUNT(album_id) as count FROM album_song WHERE album_id=' . $albums[$i]->id;
                $songCountData = $this->db->query($songCountQuery);
                $albumSongCountArray[$i] = $songCountData->result();
            }
            
            $data['albumSongCountArray'] = $albumSongCountArray;
            
            return $data;
        }
    }
?>