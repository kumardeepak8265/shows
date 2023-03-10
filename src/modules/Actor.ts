type ActorObj = {
  id: number;
  name: string;
  image: { medium: string };
  url: string;
  person: string;
};
export default ActorObj;
export type cast = {
  id: number;
  cast: ActorObj[];
};
