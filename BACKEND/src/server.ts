import app from './app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running in test mode');
  }
});
