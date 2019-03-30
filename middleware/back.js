
export default function ({ redirect, from }) {
  if (from && from.name != 'food-id') {
    return redirect('/food')
  }
}