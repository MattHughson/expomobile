import { storyblokInit, apiPlugin } from '@storyblok/js';

const Storyblok = storyblokInit({
  accessToken: 'mcY13n5iHa6FNJBIbah2oAtt', // Replace with your Storyblok access token
  use: [apiPlugin],
});

export default Storyblok;
