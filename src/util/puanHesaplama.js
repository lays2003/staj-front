export default function(dogru, yanlis, bos) {
  if (dogru == 0) return 0;
  return (100 * dogru) / (dogru + yanlis + bos);
}