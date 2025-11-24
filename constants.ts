import { CourseData } from './types';

export const COURSE_CONTENT: CourseData = {
  courseName: "Computer Networks",
  courseCode: "21CSC302J",
  units: [
    {
      id: 1,
      title: "UNIT 1 – Introduction to Networks",
      topics: [
        { id: "u1-t1", name: "Types of Networks (LAN, MAN, PAN, WAN)" },
        { id: "u1-t2", name: "Network Topologies – BUS, RING, STAR, MESH, HYBRID" },
        { id: "u1-t3", name: "Switching – Circuit Switching, Packet Switching" },
        { id: "u1-t4", name: "OSI Model (all layers)" },
        { id: "u1-t5", name: "TCP/IP Model" },
        { id: "u1-t6", name: "Physical Media (Twisted pair, Coaxial, Fiber optic, Wireless)" },
        { id: "u1-t7", name: "Performance: Bandwidth, Delay, Latency" },
      ],
      pyqs: [
        "Explain network topologies with diagram",
        "OSI Model – explain working",
        "Role of Network Layer",
        "Advantages & disadvantages of topologies"
      ]
    },
    {
      id: 2,
      title: "UNIT 2 – Addressing",
      topics: [
        { id: "u2-t1", name: "IPv4 Addressing" },
        { id: "u2-t2", name: "Address Space" },
        { id: "u2-t3", name: "Classful Addressing" },
        { id: "u2-t4", name: "Subnetting" },
        { id: "u2-t5", name: "VLSM & FLSM" },
        { id: "u2-t6", name: "NAT" },
        { id: "u2-t7", name: "Supernetting" },
        { id: "u2-t8", name: "Network Devices: Hub, Repeater, Switch, Bridge, Router" },
      ],
      pyqs: [
        "Subnet problems",
        "VLSM subnet sizing",
        "ISP allocation problems",
        "Broadcasting address / subnet mask calculations",
        "Find hosts, broadcast, first and last host"
      ]
    },
    {
      id: 3,
      title: "UNIT 3 – Routing",
      topics: [
        { id: "u3-t1", name: "Forwarding of IP packets" },
        { id: "u3-t2", name: "Static vs Default Routing" },
        { id: "u3-t3", name: "Unicast Routing Algorithms (Distance Vector, Link State, Path Vector)" },
        { id: "u3-t4", name: "Routing protocols: RIP v1, RIP v2, OSPF, BGP, EIGRP" },
        { id: "u3-t5", name: "Multicast basics" },
        { id: "u3-t6", name: "IPv6 addressing basics" },
      ],
      pyqs: [
        "Explain Link State Routing with example",
        "BGP explanation",
        "Compare RIP vs OSPF vs BGP",
        "Routing table construction questions"
      ]
    },
    {
      id: 4,
      title: "UNIT 4 – Medium Access Control",
      topics: [
        { id: "u4-t1", name: "ALOHA (Pure + Slotted)" },
        { id: "u4-t2", name: "CSMA / CD & CSMA / CA" },
        { id: "u4-t3", name: "Ethernet & Token Ring" },
        { id: "u4-t4", name: "Flow Control" },
        { id: "u4-t5", name: "Stop and Wait ARQ" },
        { id: "u4-t6", name: "Sliding Window ARQ" },
        { id: "u4-t7", name: "Error detection (Parity, Checksum, CRC, Hamming)" },
        { id: "u4-t8", name: "HDLC & PPP" },
      ],
      pyqs: [
        "CSMA/CA – how collision avoided",
        "Token Management + Token Ring",
        "CRC numerical problems",
        "Sliding window protocol",
        "Error control mechanisms"
      ]
    },
    {
      id: 5,
      title: "UNIT 5 – Transport & Application Layer",
      topics: [
        { id: "u5-t1", name: "Port Numbers" },
        { id: "u5-t2", name: "UDP & TCP" },
        { id: "u5-t3", name: "TCP Header Format & Services" },
        { id: "u5-t4", name: "TCP Connection (Three-way handshake, Termination)" },
        { id: "u5-t5", name: "WWW & HTTP" },
        { id: "u5-t6", name: "FTP" },
        { id: "u5-t7", name: "Email Protocols: SMTP, POP3, IMAP" },
        { id: "u5-t8", name: "DNS & Telnet" },
      ],
      pyqs: [
        "Email Format + Architecture",
        "TCP Header Format",
        "Four-way handshake",
        "SMTP / DNS / FTP explanations"
      ]
    }
  ]
};