# TvChous Server

## Configuration

```
downloadedFolder: path.join(getUserHome(), "Downloads", "downloaded"),
tvshowsFolder: path.join(getUserHome(), "Downloads", "tvshows"),
utorrentUser: "",
utorrentPassword: "",
utorrentPort: "",
serverPort: "5004",
traktApiKey: "...",
env: "production"
```

Configuration can be passed as environment variables

```
DOWNLOADED_FOLDER=/Users/axelhzf/Downloads/utorrent/downloaded \
SHOWS_FOLDER=/Users/axelhzf/Downloads/utorrent/tvshows \
UTORRENT_USER=xxx \
UTORRENT_PASSWORD=xxx \
UTORRENT_PORT=40959 \
ENV=dev \
node --harmony lib/server.js
```

## Methods

The best way to interact with this server is using the `tvchous-client`

* `findShows` 
* `findShow` 
* `findSeason`
* `findEpisode`
* `downloadedFolders`
* `findTorrents`
* `defaultTorrentForEpisode`
* `downloadTorrent`
* `downloadSubtitle`
* `torrentList`

## Models

### Show

```json
{
  "title": "Elementary",
  "year": 2012,
  "url": "http://trakt.tv/show/elementary",
  "first_aired": 1348729200,
  "country": "United States",
  "overview": "Following his fall from grace in London and a stint in rehab, eccentric Sherlock escapes to Manhattan where his wealthy father forces him to live with his worst nightmare – a sober companion, Dr. Watson. A successful surgeon until she lost a patient and her license three years ago, Watson views her current job as another opportunity to help people, as well as paying a penance. Holmes resumes his work as a police consultant in New York City and Watson has no choice but to accompany her irascible new charge on his jobs. But Sherlock finds her medical background helpful, and Watson realizes she has a knack for playing investigator.\n\nWith the mischievous Sherlock Holmes now running free in New York solving crimes, it’s simple deduction that he’s going to need someone to keep him grounded, and it’s elementary that it’s a job for Watson. ",
  "runtime": 60,
  "status": "Continuing",
  "network": "CBS",
  "air_day": "Thursday",
  "air_time": "10:00pm",
  "certification": "TV-14",
  "imdb_id": "tt2191671",
  "tvdb_id": "255316",
  "tvrage_id": "30750",
  "poster": "http://slurm.trakt.us/images/posters/16469.25.jpg",
  "images": {
    "poster": "http://slurm.trakt.us/images/posters/16469.25.jpg",
    "fanart": "http://slurm.trakt.us/images/fanart/16469.25.jpg",
    "banner": "http://slurm.trakt.us/images/banners/16469.25.jpg"
  },
  "watchers": 7,
  "ratings": {
    "percentage": 82,
    "votes": 5083,
    "loved": 4800,
    "hated": 283
  },
  "genres": [
    "Drama",
    "Crime",
    "Mystery"
  ],
  "id": "Elementary",
  "favorite": true
} 
``` 

### Season

```json
{
  "season": 3,
  "episodes": [...],
  "url": "http://trakt.tv/show/elementary/season/3",
  "poster": "http://slurm.trakt.us/images/posters/16469.25.jpg",
  "images": {
    "poster": "http://slurm.trakt.us/images/posters/16469.25.jpg"
  },
  "episodes_count": 2,
  "id": "03"
}
```

### Episode

```json
    {
      "season": "03",
      "episode": 1,
      "number": 1,
      "tvdb_id": 4912563,
      "title": "Enough Nemesis To Go Around",
      "overview": "Joan Watson plays cat and mouse with a clever (and female) drug trafficker. The character, Elana March, inherited a drug cartel and her late husband seems to enjoy staying one step ahead of Joan.",
      "first_aired": 1414731600,
      "first_aired_iso": "2014-10-30T22:00:00-04:00",
      "first_aired_utc": 1414720800,
      "url": "http://trakt.tv/show/elementary/season/3/episode/1",
      "screen": "http://slurm.trakt.us/images/fanart/16469-940.25.jpg",
      "images": {
        "screen": "http://slurm.trakt.us/images/fanart/16469-940.25.jpg"
      },
      "ratings": {
        "percentage": 0,
        "votes": 0,
        "loved": 0,
        "hated": 0
      },
      "showId": "Elementary",
      "first_aired_date": "2014-10-31T02:00:00.000Z",
      "id": "01",
      "fullId": "S03E01",
      "isAired": false
    }
```

### Torrent

## Debug

```
DEBUG=tvchous:server:* node --harmony lib/server.js
```    

