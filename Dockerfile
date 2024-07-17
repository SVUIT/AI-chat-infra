FROM ruby:3.2.3

WORKDIR /mmtt

# Copy the Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install Bundler and project dependencies
RUN gem install bundler && bundle install

# Copy the project files after installing dependencies to leverage Docker caching
COPY . /mmtt

# Install Jekyll
RUN gem install jekyll

# Expose the port that Jekyll will serve on
EXPOSE 4000

# Start Jekyll
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
