import type { Topic } from "./resources";

// One representative, freely-licensed image per branch of philosophy, for the
// homepage category grid. Same sourcing approach as resource images — see
// scripts/resolve_images.py and README.
export const TOPIC_IMAGES: Record<
  Topic,
  { url: string; credit: string; creditUrl: string }
> = {
  Ethics: {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Lady_Justice%2C_the_Old_Bailey_-_geograph.org.uk_-_7017754.jpg",
    credit: "Philip Halling",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Lady_Justice,_the_Old_Bailey_-_geograph.org.uk_-_7017754.jpg",
  },
  Metaphysics: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    credit: "Vincent van Gogh",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  },
  Epistemology: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Centuries_or_decades_old_books_at_the_Central_Library%2C_Panjim%2C_Goa_2.jpg/1280px-Centuries_or_decades_old_books_at_the_Central_Library%2C_Panjim%2C_Goa_2.jpg",
    credit: "Fredericknoronha",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Centuries_or_decades_old_books_at_the_Central_Library,_Panjim,_Goa_2.jpg",
  },
  Logic: {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/15/The_Elements_of_Geometry_WDL7103.jpg",
    credit: "Ignace-Gaston Pardies",
    creditUrl: "https://commons.wikimedia.org/wiki/File:The_Elements_of_Geometry_WDL7103.jpg",
  },
  "Political Philosophy": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/View_of_the_newly_discovered_part_of_the_Ancient_Agora_of_Athens_from_the_space_between_the_train_line_and_Adrianou_Street.jpg/1280px-View_of_the_newly_discovered_part_of_the_Ancient_Agora_of_Athens_from_the_space_between_the_train_line_and_Adrianou_Street.jpg",
    credit: "George E. Koronaios",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:View_of_the_newly_discovered_part_of_the_Ancient_Agora_of_Athens_from_the_space_between_the_train_line_and_Adrianou_Street.jpg",
  },
  "Philosophy of Mind": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Brain%3B_dissection_showing_the_top_of_the_brain%2C_with_the_dur_Wellcome_V0008398.jpg/1280px-Brain%3B_dissection_showing_the_top_of_the_brain%2C_with_the_dur_Wellcome_V0008398.jpg",
    credit: "Wellcome Collection",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Brain;_dissection_showing_the_top_of_the_brain,_with_the_dur_Wellcome_V0008398.jpg",
  },
  Aesthetics: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    credit: "Sandro Botticelli",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
  },
  "Philosophy of Religion": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Sistine_Chapel_ceiling%2C_Creation_of_Adam.jpg/1280px-Sistine_Chapel_ceiling%2C_Creation_of_Adam.jpg",
    credit: "Michelangelo",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Sistine_Chapel_ceiling,_Creation_of_Adam.jpg",
  },
  Existentialism: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/The_Scream_Pastel.jpg/1280px-The_Scream_Pastel.jpg",
    credit: "Edvard Munch",
    creditUrl: "https://commons.wikimedia.org/wiki/File:The_Scream_Pastel.jpg",
  },
  "Eastern Philosophy": {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Statue_of_Buddha_in_sarnath_in_india.jpg/1280px-Statue_of_Buddha_in_sarnath_in_india.jpg",
    credit: "Akhtar736",
    creditUrl: "https://commons.wikimedia.org/wiki/File:Statue_of_Buddha_in_sarnath_in_india.jpg",
  },
};
