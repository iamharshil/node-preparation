# Documentation

### Streams

-   First my server read that file (text.txt)(maybe it is 1GB file) which first load data in memory.
-   Once my data read is complete then it will be sent to user.
-   The problem with this is that what if I will have 100's of users requesting for same data like youtube.
-   This is not memory efficient.

-   To solve this we have stream concept.
-   In real time as server reads data it return that particular chunks to user.
-   So we created pipeline which read data and as it read it will also send it to user simultaneously

-   To learn more - https://nodejs.org/api/stream.html
