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
  Button,
} from '@mui/material';
import './CourseOverview.css';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ArticleIcon from '@mui/icons-material/Article';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MovieIcon from '@mui/icons-material/Movie';
import CloseIcon from '@mui/icons-material/Close';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import ReactPlayer from 'react-player/lazy';
import Select from 'react-select';

const MediaList = () => {
  const [mediaList, setMediaList] = useState([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formText, setFormText] = useState('');
  const [selectedVideoIndexes, setSelectedVideoIndexes] = useState([]);
  const [formErrors, setFormErrors] = useState({
    moduleName: '',
    selectedVideos: '',
  });

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
    setSelectedVideoIndexes([]);
    setFormErrors({
      moduleName: '',
      selectedVideos: '',
    });
  };

  const handleFormTextChange = (e) => {
    // Clear the module name error when the user starts typing
    setFormErrors({ ...formErrors, moduleName: '' });
    setFormText(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      moduleName: '',
      selectedVideos: '',
    };

    if (formText.trim() === '') {
      errors.moduleName = 'Module name is required';
      isValid = false;
    }

    if (selectedVideoIndexes.length === 0) {
      errors.selectedVideos = 'Please select at least one video';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // Continue with form submission if all validations pass
    if (selectedVideoIndexes.length > 0 && selectedMedia && selectedMedia.videos) {
      const selectedVideoUrls = selectedVideoIndexes.map((index) => selectedMedia.videos[index]);
      console.log('Selected Video URLs:', selectedVideoUrls);

      // Send a POST request to your backend to create a new video
      try {
        const response = await axios.post('http://localhost:3001/videos/create', {
          moduleName: formText,
          videoUrls: selectedVideoUrls,
        });
        console.log('Video data saved:', response.data);
      } catch (error) {
        console.error('Error saving video data:', error);
      }
    }
    closeFormDialog();
  };

  return (
    <MainCard title="Media List">
      <Dialog open={isVideoOpen} onClose={closeVideoDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Video Player
          <IconButton aria-label="close" onClick={closeVideoDialog} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ReactPlayer
            controls={true}
            url={currentVideo}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
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
        <DialogContent sx={{ height: '500px', width: '500px' }}>
          <form onSubmit={handleFormSubmit}>
            {/* Display the ID as a non-editable field */}
            <TextField
              label="ID"
              fullWidth
              variant="outlined"
              margin="normal"
              value={selectedMedia ? selectedMedia._id : ''}
              disabled // This makes the field non-editable
              sx={{ marginBottom: '16px' }}
            />

            <TextField
              label="Module name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={formText}
              onChange={handleFormTextChange} 
              error={!!formErrors.moduleName}
              helperText={formErrors.moduleName}
              sx={{ marginBottom: '16px' }}
            />

            <Select
              isMulti
              placeholder="Select Videos"
              options={
                selectedMedia && selectedMedia.videos
                  ? selectedMedia.videos.map((videoUrl, index) => ({
                      value: index,
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <SmartDisplayIcon style={{ marginRight: '8px' }} /> {`Video ${index + 1}`}
                        </div>
                      ),
                    }))
                  : []
              }
              value={selectedVideoIndexes.map((index) => ({ value: index, label: `Video ${index + 1}` }))}
              onChange={(selectedOptions) => {
                const selectedIndexes = selectedOptions.map((option) => option.value);
                setSelectedVideoIndexes(selectedIndexes);

                // Clear the selected videos error when the user makes a selection
                setFormErrors({ ...formErrors, selectedVideos: '' });
              }}
              error={!!formErrors.selectedVideos}
            />

            <Typography variant="body2" color="error">
              {formErrors.selectedVideos}
            </Typography>

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
