import DASscrShot from './screenshots/DrawAndShare.png';
import FaceRecogScrShot from './screenshots/FaceRecog.png';
import RobofriendsScrShot from './screenshots/Robofriends.png';
import BGGENscrShot from './screenshots/BGGEN.png';

import DASwebm from './gifs/DrawAndShare.webm';
import FaceRecogWebm from './gifs/FaceRecog.webm';
import RobofriendsWebm from './gifs/Robofriends.webm';
import BGGENwebm from './gifs/BGGen.webm';

import DASmp4 from './gifs/DrawAndShare.mp4';
import FaceRecogMp4 from './gifs/FaceRecog.mp4';
import RobofriendsMp4 from './gifs/Robofriends.mp4';
import BGGENmp4 from './gifs/BGGen.mp4';

const projectsImages = {
    DrawAndShare: { screenshot: DASscrShot, webm: DASwebm, mp4: DASmp4 },
    FaceRecog: { screenshot: FaceRecogScrShot, webm: FaceRecogWebm, mp4: FaceRecogMp4 },
    Robofriends: { screenshot: RobofriendsScrShot, webm: RobofriendsWebm, mp4: RobofriendsMp4  },
    BGGEN: { screenshot: BGGENscrShot, webm: BGGENwebm, mp4: BGGENmp4 }
}

export default projectsImages;