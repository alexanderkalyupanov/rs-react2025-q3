# Perfomance

Initial profiling was performed using React DevTools Profiler.

Tested interactions:
Sorting a column
Searching for a country

## Before optimization

- Sorting a column:
Commit Duration: 6.8s
Render Duration: 162.8ms
Interactions: Sorting

### Flame Graph for sorting
<img width="1908" height="311" alt="sort2" src="https://github.com/user-attachments/assets/f6f9a0aa-e9bb-40e7-b175-33895f30a249" />

### Ranked Chart for sorting
<img width="1916" height="192" alt="sort1" src="https://github.com/user-attachments/assets/3c05913f-3f0d-460c-87aa-7ccf4fd94f8d" />

- Searching country:
Commit Duration: 3s
Render Duration: 4.1ms
Interactions: Search

### Flame Graph for searching
<img width="1914" height="272" alt="search" src="https://github.com/user-attachments/assets/9e874419-46f2-4134-9b60-4277a176352c" />


### Ranked Chart for searching
<img width="1919" height="257" alt="search1" src="https://github.com/user-attachments/assets/3528ae7a-c2d8-4826-8592-e8740ac0cdcd" />

## After optimizatin

- Sorting a column:
Commit Duration: 5s
Render Duration: 165.7ms
Interactions: Sorting

### Flame Graph for sorting
<img width="1919" height="245" alt="sorted1after" src="https://github.com/user-attachments/assets/434099db-122d-4d3a-81d3-25864cd309a2" />


### Ranked Chart for sorting
<img width="1919" height="267" alt="sorted2after" src="https://github.com/user-attachments/assets/e09a0514-9dc3-4b0d-b835-da31338434f8" />

- Searching country:
Commit Duration: 2.3s
Render Duration: 4.1ms
Interactions: Search

### Flame Graph for searching
<img width="1915" height="331" alt="searchbefore1" src="https://github.com/user-attachments/assets/f3ed4fe5-3506-45ba-b9be-fc9d2b5c90d4" />


### Ranked Chart for searching
<img width="1919" height="368" alt="Screenshot_1" src="https://github.com/user-attachments/assets/460138d0-fbd6-4ce8-a64a-adbcc087c1cf" />

