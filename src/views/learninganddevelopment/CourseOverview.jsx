import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper, Dialog, DialogContent } from '@mui/material';
import axios from 'axios';

const CourseOverview = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Fetch course data from your backend API using Axios
    // Replace 'YOUR_BACKEND_URL/api/course' with your actual API endpoint
    axios.get('http://localhost:3001/learn/entries')
      .then(response => {
        setCourseData(response.data);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, []);

  const openVideoDialog = (videoUrl) => {
    setVideoUrl(videoUrl);
    setIsVideoOpen(true);
  };

  const closeVideoDialog = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <MainCard title="Course Overview">
        {courseData.map(course => (
          <Paper elevation={2} sx={{ maxWidth: 300, borderRadius: '12px' }} key={course._id}>
            <CardMedia
              sx={{ height: 110 }}
              image={course.image}
              title={course.courseName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {course.courseName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.courseDescription}
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="secondary" onClick={() => openVideoDialog(course.video)}>
                Play
              </Button>
            </CardActions>
          </Paper>
        ))}
      </MainCard>

      <Dialog open={isVideoOpen} onClose={closeVideoDialog}>
        <DialogContent>
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            title="Video"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseOverview;
