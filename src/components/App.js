import React from "react";

// import css file
import "../css/App.css";

// Import iPod body file
import Case from "./Case.js";

// Import songs
import song1 from "../static/songs/Stay.mp3";
import song2 from "../static/songs/Believer.mp3";
import song3 from "../static/songs/See You Again.mp3";
import song4 from "../static/songs/Faded X Alone.mp3";
import song5 from "../static/songs/Shape of You.mp3";
import song6 from "../static/songs/Levitating.mp3";
import song7 from "../static/songs/Perfect.mp3";
import song8 from "../static/songs/Blinding Lights.mp3";
import song9 from "../static/songs/Sorry.mp3";

// Import song cover images
import song1Img from "../static/images/Stay-img.jpg";
import song2Img from "../static/images/Believer-img.jpg";
import song3Img from "../static/images/See_you_again-img.jpg";
import song4Img from "../static/images/Faded-img.jpg";
import song5Img from "../static/images/Shape_Of_You_img.png";
import song6Img from "../static/images/Levitating.jpg";
import song7Img from "../static/images/Perfect.jpeg";
import song8Img from "../static/images/The Weeknd.png";
import song9Img from "../static/images/Sorry.jpeg";

// Import wallpapers
import Wallpaper2 from "../static/images/Wallpaper-1.jpg";
import Wallpaper1 from "../static/images/Wallpaper-2.jpg";
import Wallpaper3 from "../static/images/Wallpaper-3.jpg";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0, //Active list item
      menuItems: ["Now Playing", "Music", "Games", "Settings"], //menu Items
      musicItems: ["All Songs", "Artist", "Albums"], //Items in music
      songItemsUrl: [
        song1,
        song2,
        song3,
        song4,
        song5,
        song6,
        song7,
        song8,
        song9,
      ], //songs list
      songImgItemsUrl: [
        song1Img,
        song2Img,
        song3Img,
        song4Img,
        song5Img,
        song6Img,
        song7Img,
        song8Img,
        song9Img,
      ], //song images list
      wallpaperItems: [Wallpaper1, Wallpaper2, Wallpaper3], //wallpapers
      songItems: [
        "Stay - Justin Bieber",
        "Believer - Imagine Dragons",
        "See You Again - Charlie Puth",
        "Faded - Alan Walker",
        "Shape of You - Ed Sheeran",
        "Levitating - Dua Lipa ft. DaBaby",
        "Perfect - Ed Sheeran",
        "Blinding Lights - The Weeknd",
        "Sorry - Justin Bieber",
      ], //song names
      songIndex: 0, //current song
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 }, //length of a particular menu
      menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] }, //which menu can be rendered by key menu
      currentMenu: -2, //current menu which is lockscreen initially
      navigationStack: [], //Used for navigation forward and backward
      songUrl: song1, //current song url
      playing: false, //playing or not
      theme: "rgb(210, 210, 210)", //current body theme
      audio: new Audio(song1), //current audio file
      songImgUrl: song1Img, //current song img for now playing
      wheelColor: "white", //current wheel color
      wallpaper: 0, //current wallpaper
      noty: false, // has to show notification or not
      notifyText: "Wallpaper Changed", //notification text
    };
  }

  // FUNCTION FOR : ON LONG PRESS OF FORWARD BUTTON TRACKS ARE SEEKED FORWARD
  seekSongForward = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = 0;
      } else {
        songIndex++;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      });
    }
  };

  // FUNCTION FOR : ON LONG PRESS OF FORWARD BUTTON TRACKS ARE SEEKED BACKWARD
  seekSongReverse = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    console.log(e.detail.interval);
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === 0) {
        songIndex = this.state.songItemsUrl.length - 1;
      } else {
        songIndex--;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      });
    }
  };

  // FUNCTION FOR : TOGGLE SONG PLAY AND PAUSE
  togglePlayPause = () => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
    } else {
      this.setState({ playing: true });
      this.state.audio.play();
    }
  };

  // FUNCTION FOR : UPDATE ACTIVE MENU WHILE ROTATING ON THE TRACK-WHEEL
  // updateActiveMenu = (direction, menu) => {
  //   if (
  //     menu !== -1 &&
  //     menu !== 1 &&
  //     menu !== 4 &&
  //     menu !== 8 &&
  //     menu !== 3 &&
  //     menu !== 9 &&
  //     menu !== 10
  //   ) {
  //     return;
  //   }
  //   let min = 0;
  //   let max = 0;

  //   max = this.state.lengthMenuKey[menu];

  //   if (direction === 1) {
  //     if (this.state.active >= max) {
  //       this.setState({ active: min });
  //     } else {
  //       this.setState({ active: this.state.active + 1 });
  //     }
  //   } else {
  //     if (this.state.active <= min) {
  //       this.setState({ active: max });
  //     } else {
  //       this.setState({ active: this.state.active - 1 });
  //     }
  //   }
  // };
  //
  updateActiveMenu = (direction, menu) => {
    if (menu === 4) {
      // Assuming menu 4 is the song list
      const max = this.state.songItems.length - 1;
      const min = 0;

      if (direction === 1) {
        // Scroll down
        this.setState({
          active: this.state.active >= max ? min : this.state.active + 1,
        });
      } else {
        // Scroll up
        this.setState({
          active: this.state.active <= min ? max : this.state.active - 1,
        });
      }
      return;
    }

    // Existing logic for other menus
    let min = 0;
    let max = this.state.lengthMenuKey[menu];
    if (direction === 1) {
      this.setState({
        active: this.state.active >= max ? min : this.state.active + 1,
      });
    } else {
      this.setState({
        active: this.state.active <= min ? max : this.state.active - 1,
      });
    }
  };

  //

  // FUNCTION FOR : CHANGE THE THEME OF iPod BODY
  setTheme = (id) => {
    let theme = "";
    if (id === 0) {
      theme = "#f0f0f0";
    } else if (id === 1) {
      theme = "#555d50"; //black
    } else if (id === 2) {
      theme = "#ffcc00";
    } else if (id === 3) {
      theme = "#D1CDDA";
    } else if (id === 4) {
      theme = "#c4aead";
    }
    this.setState({ theme: theme, noty: true, notifyText: "Theme Changed" }); //Notification
    return;
  };

  // FUNCTION FOR : CHANGE COLOR OF WHEEL
  setWheelColor = (id) => {
    let wheelColor = "";
    if (id === 0) {
      wheelColor = "#212121";
    } else if (id === 1) {
      wheelColor = "white";
    } else if (id === 2) {
      wheelColor = "#3E2723";
    } else if (id === 3) {
      wheelColor = "#3D5AFE";
    }
    this.setState({
      wheelColor: wheelColor,
      noty: true,
      notifyText: "Wheel Color Changed",
    });
    return;
  };

  // FUNCTION FOR : SET WALLPAPER OF iPod Body
  setWallpaper = (id) => {
    this.setState({
      wallpaper: id,
      noty: true,
      notifyText: "Wallpaper Changed",
    });
    return;
  };

  // FUNCTION FOR : CHANGE PLAYING MUSIC
  chagePlayingSongFromMusicMenu = (id, navigationStack) => {
    const songUrl = this.state.songItemsUrl[id];
    const songImgUrl = this.state.songImgItemsUrl[id];
    this.state.audio.pause();
    this.setState(
      {
        currentMenu: 7,
        songUrl: songUrl,
        navigationStack: navigationStack,
        active: 0,
        playing: true,
        songIndex: id,
        audio: new Audio(songUrl),
        songImgUrl: songImgUrl,
      },
      () => {
        this.state.audio.play();
      }
    );
    return;
  };

  // FUNCTION FOR : CHANGE MENU BACKWARDS on PRESS OF CENTER BUTTON
  changeMenuBackward = () => {
    const navigationStack = this.state.navigationStack.slice();
    if (this.state.currentMenu === -2) {
      return;
    } else {
      const prevId = navigationStack.pop();
      this.setState({
        currentMenu: prevId,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }
  };

  // FUNCTION FOR : CHANGE MENU FORWARD on PRESS OF CENTER BUTTON using NAVIGATION STACK
  changeMenuForward = (id, fromMenu) => {
    const navigationStack = this.state.navigationStack.slice();

    if (
      fromMenu !== -2 &&
      fromMenu !== -1 &&
      fromMenu !== 1 &&
      fromMenu !== 4 &&
      fromMenu !== 3 &&
      fromMenu !== 8 &&
      fromMenu !== 9 &&
      fromMenu !== 0 &&
      fromMenu !== 7 &&
      fromMenu !== 10
    ) {
      return;
    }

    if (fromMenu === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: -1,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }

    if (fromMenu === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: id,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }

    if (fromMenu === 7 || fromMenu === 0) {
      this.togglePlayPause();
      return;
    }

    if (fromMenu === 8) {
      this.setTheme(id);
      return;
    }

    if (fromMenu === 9) {
      this.setWheelColor(id);
      return;
    }

    if (fromMenu === 10) {
      this.setWallpaper(id);
      return;
    }

    navigationStack.push(this.state.currentMenu);

    if (fromMenu === 4) {
      this.chagePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
      return;
    }

    const currentMenuID = this.state.menuMapping[fromMenu][id];
    this.setState({
      currentMenu: currentMenuID,
      navigationStack: navigationStack,
      active: 0,
    });
  };

  // FUNCTION FOR : SET NOTIFICATION AS FALSE AFTER SENDING NOTIFICATION
  setNoty = () => {
    this.setState({ noty: false });
    return;
  };

  // FUNCTION FOR : RENDERING APP
  render() {
    const {
      audio,
      active,
      currentMenu,
      menuItems,
      musicItems,
      songItems,
      playing,
      songIndex,
      theme,
      songUrl,
      songImgUrl,
      wheelColor,
      wallpaper,
      wallpaperItems,
      noty,
      notifyText,
    } = this.state;
    return (
      <div className="App">
        <Case
          songIndex={songIndex}
          active={active}
          menuItems={menuItems}
          musicItems={musicItems}
          currentMenu={currentMenu}
          changeMenuForward={this.changeMenuForward}
          changeMenuBackward={this.changeMenuBackward}
          updateActiveMenu={this.updateActiveMenu}
          togglePlayPause={this.togglePlayPause}
          songItems={songItems}
          playing={playing}
          theme={theme}
          audio={audio}
          songUrl={songUrl}
          songImgUrl={songImgUrl}
          seekSongForward={this.seekSongForward}
          seekSongReverse={this.seekSongReverse}
          wheelColor={wheelColor}
          wallpaper={wallpaper}
          wallpaperItems={wallpaperItems}
          noty={noty}
          setNoty={this.setNoty}
          notifyText={notifyText}
        />
      </div>
    );
  }
}

export default App;
