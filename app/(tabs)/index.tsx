import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import Storyblok from '../services/storyblokService'; // Import the Storyblok service
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getEditableProps } from '../Utilities/storyblokEditable'; // Import the utility to handle storyblokEditable


export default function HomeScreen() {
  const [story, setStory] = useState(null);

  useEffect(() => {
    // Fetch data from Storyblok
    const fetchStory = async () => {
      try {
        const response = await Storyblok.storyblokApi?.get('cdn/stories/home', {
          version: 'draft', 
        });
        if (response && response.data) {
          console.log('Story fetched:', response.data.story);
          setStory(response.data.story); 
        }
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    fetchStory(); // Call the fetch function
  }, []);

  if (!story) {
    return <ThemedText>Loading...</ThemedText>; // Loading state
  }


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={story?.content?.body[0].logo.filename ? {uri: story?.content?.body[0].logo.filename} : require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
           resizeMode="contain"
        />
      }
    >
      <ThemedView style={styles.titleContainer} {...getEditableProps(story.content)}>
        <ThemedText className="text-purple-400 font-semibold" type="title">
          {story?.content?.body[0].title}
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer} {...getEditableProps(story.content)}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          {story?.content?.description}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 300,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
