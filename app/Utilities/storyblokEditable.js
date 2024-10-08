import { storyblokEditable } from '@storyblok/js'; 

export const getEditableProps = (blok) => {
  if (!blok) return {};
  const editable = storyblokEditable(blok); 
  return {
    'data-blok-c': editable['data-blok-c'],
    'data-blok-uid': editable['data-blok-uid'],
  };
};
