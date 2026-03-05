export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  backdrop: string;
  rating: string;
  year: string;
  duration: string;
  genre: string[];
  isTrending?: boolean;
  isNew?: boolean;
  videoUrl?: string;
}

export const MOVIES: Movie[] = [
  {
    id: '10',
    title: 'Deadpool & Wolverine',
    description: 'A weary Wolverine finds himself recovering from his injuries when he comes across a loudmouth Deadpool who has traveled through time to heal his best friend in the hopes of befriending the wild beast and teaming up to take down a common enemy.',
    thumbnail: 'https://cdn.discordapp.com/attachments/1464986272438157336/1479186694250037329/images_1.jpg?ex=69ab1f75&is=69a9cdf5&hm=947b3481deb335c3e833e160a175be4f17be34281bdad57cd269b50dff020817&',
    backdrop: 'https://cdn.discordapp.com/attachments/1464986272438157336/1479186694250037329/images_1.jpg?ex=69ab1f75&is=69a9cdf5&hm=947b3481deb335c3e833e160a175be4f17be34281bdad57cd269b50dff020817&',
    rating: '8.1',
    year: '2024',
    duration: '2h 8m',
    genre: ['Action', 'Comedy', 'Sci-Fi'],
    isTrending: true,
    isNew: true,
    videoUrl: 'https://uqload.is/embed-7rk7jrj5t95y.html'
  },
  {
    id: '11',
    title: 'Taxi',
    description: 'To save his driver\'s license, a delivery boy who is a speed freak must help an inept police officer who can\'t drive to take down a gang of German bank robbers.',
    thumbnail: 'https://cdn.discordapp.com/attachments/1464986272438157336/1479187207775588392/affiche.jpg?ex=69ab1ff0&is=69a9ce70&hm=bcc838589c83445dc6cd7a2776e5b129043fa5560f13c441d441260e22797469&',
    backdrop: 'https://cdn.discordapp.com/attachments/1464986272438157336/1479187207775588392/affiche.jpg?ex=69ab1ff0&is=69a9ce70&hm=bcc838589c83445dc6cd7a2776e5b129043fa5560f13c441d441260e22797469&',
    rating: '7.0',
    year: '1998',
    duration: '1h 26m',
    genre: ['Action', 'Comedy', 'Crime'],
    isTrending: true,
    isNew: false,
    videoUrl: 'https://uqload.is/embed-0gras7sk3kvy.html'
  }
];
