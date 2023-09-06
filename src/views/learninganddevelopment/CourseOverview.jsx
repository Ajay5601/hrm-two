import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import './CourseOverview.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MovieIcon from '@mui/icons-material/Movie';
import CloseIcon from '@mui/icons-material/Close';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import ReactPlayer from 'react-player/lazy';

const MediaList = () => {
  const [mediaList, setMediaList] = useState([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formText, setFormText] = useState('');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  const fetchMediaList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/media/getAll');
      setMediaList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMediaList();
  }, []);

  const openVideoDialog = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setIsVideoOpen(true);
  };

  const closeVideoDialog = () => {
    setCurrentVideo('');
    setIsVideoOpen(false);
  };

  const openMediaDialog = (media) => {
    setSelectedMedia(media);
  };

  const closeMediaDialog = () => {
    setSelectedMedia(null);
  };

  const openFormDialog = () => {
    setIsFormOpen(true);
  };

  const closeFormDialog = () => {
    setIsFormOpen(false);
    setFormText('');
    setSelectedVideoIndex(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedVideoIndex !== null && selectedMedia && selectedMedia.videos) {
      const selectedVideoUrl = selectedMedia.videos[selectedVideoIndex];
      console.log(`Selected Video URL: ${selectedVideoUrl}`);
    }
    closeFormDialog();
  };

  return (
    <MainCard title="Media List">
      <Dialog open={isVideoOpen} onClose={closeVideoDialog}>
        <DialogContent>
          <ReactPlayer
            controls={true}
            url={currentVideo}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
          />
        </DialogContent>
      </Dialog>

      <Grid container spacing={3}>
        {mediaList.map((media) => (
          <Grid item xs={12} sm={4} md={4} key={media._id}>
            <Paper elevation={2} sx={{ maxWidth: 300, borderRadius: '12px', height: 300 }}>
              <Card onClick={() => openMediaDialog(media)} style={{ cursor: 'pointer', height: '100%' }}>
                <CardMedia sx={{ height: 110 }} image={media.image} title={media.courseName} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {media.courseName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {media.courseDescription}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {selectedMedia && (
        <Dialog open={selectedMedia !== null} onClose={closeMediaDialog} fullScreen>
          <DialogTitle>
            All Uploaded Videos
            <IconButton aria-label="close" onClick={closeMediaDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Grid container spacing={0}>
              {selectedMedia.videos ? (
                selectedMedia.videos.map((videoUrl, index) => (
                  <Grid item xs={12} key={index} style={{ marginBottom: '3px' }}>
                    <MovieIcon onClick={() => openVideoDialog(videoUrl)} style={{ cursor: 'pointer', fontSize: 40 }} />
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      Video {index + 1}
                    </Typography>
                  </Grid>
                ))
              ) : (
                <Typography variant="body2">No videos available.</Typography>
              )}
            </Grid>
          </DialogContent>
          <SpeedDial
            ariaLabel="Speed Dial"
            icon={<SpeedDialIcon />}
            onClose={() => setIsSpeedDialOpen(false)}
            onOpen={() => setIsSpeedDialOpen(true)}
            open={isSpeedDialOpen}
            direction="up"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
          >
            <SpeedDialAction key="Form" icon={<ArticleIcon />} tooltipTitle="Form" onClick={openFormDialog} />
            <SpeedDialAction
              key="Add Video"
              icon={<VideoCallIcon />}
              tooltipTitle="Add Video"
              onClick={() => {
                // Handle adding a video action here
                // You can implement your logic for adding videos here
              }}
            />
          </SpeedDial>
        </Dialog>
      )}

      <Dialog open={isFormOpen} onClose={closeFormDialog}>
        <DialogTitle>Add Video Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Video Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={formText}
              onChange={(e) => setFormText(e.target.value)}
            />
            <Select
              label="Select Video"
              fullWidth
              variant="outlined"
              value={selectedVideoIndex}
              onChange={(e) => setSelectedVideoIndex(e.target.value)}
            >
              <MenuItem value={null}>Select a Video</MenuItem>
              {selectedMedia &&
                selectedMedia.videos &&
                selectedMedia.videos.map((videoUrl, index) => (
                  
                  <MenuItem key={index} value={index}>
                    <PlayCircleIcon style={{ marginRight: '10px' }} />
                    Video {index + 1}
                  </MenuItem>
                ))}
            </Select>

            <IconButton aria-label="close" onClick={closeFormDialog} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </MainCard>
  );
};

export default MediaList;