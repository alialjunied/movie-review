json.array!(@movies) do |movie|
  json.extract! movie, 
  json.url movie_url(movie, format: :json)
end
