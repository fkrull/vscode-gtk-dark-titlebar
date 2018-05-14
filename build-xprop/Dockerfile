FROM centos:6
RUN yum install -y \
    autoconf \
    automake \
    gcc \
    git \
    libX11-devel \
    make \
    xorg-x11-util-macros

COPY build.sh /build.sh
CMD ["/bin/sh", "/build.sh"]
