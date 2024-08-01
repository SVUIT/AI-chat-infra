# Use the official Python image as a base image
FROM python:3.9.17-bookworm

# Allow statements and log messages to immediately appear in the logs
ENV PYTHONUNBUFFERED True

# Set environment variable for the port
ENV PORT 5000

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run the application
# gunicorn cmd to run the Gunicorn server
# --bind 0.0.0.0:5000: Binds the server to all network interfaces
# --worker-class eventlet: Use 'eventlet' worker class for handling requests, which is best suited for socket-based communication
# --workers 1: Number of worker processes
# app:app: The module and callable to run the Flask application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--worker-class", "eventlet", "--workers", "1", "app:app"]
