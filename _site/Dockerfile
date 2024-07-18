FROM ruby:3.2.3


# Copy the project files
COPY . /MMTT
COPY Gemfile Gemfile.lock ./


# Install Bundler and project dependencies
RUN gem install bundler && bundle install

# Expose the port
EXPOSE 4000

# Start Jekyll
