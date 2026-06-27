# MiniTask

MiniTask to prosta aplikacja rozproszona napisana w języku C#. Projekt symuluje firmowy system zarządzania zadaniami.

## Opis projektu

Aplikacja umożliwia dodawanie, wyświetlanie, edytowanie i usuwanie zadań. Każde zadanie posiada tytuł, opis oraz status. Dane są przechowywane w bazie SQLite, a komunikacja między częścią kliencką i serwerową odbywa się za pomocą żądań HTTP.

Projekt został wykonany w ramach ćwiczenia z tworzenia aplikacji rozproszonej oraz pracy z repozytorium GitHub.

## Technologie

W projekcie wykorzystano:

* C#,
* ASP.NET Core Minimal API,
* Entity Framework Core,
* SQLite,
* HTML,
* CSS,
* JavaScript,
* Git i GitHub.

## Architektura aplikacji

Aplikacja składa się z trzech głównych części:

* Back-End — serwer API napisany w C#,
* Baza danych — SQLite przechowująca zadania,
* Front-End — prosta strona internetowa umożliwiająca obsługę zadań.

Aplikacja ma charakter rozproszony, ponieważ część kliencka komunikuje się z serwerem za pomocą żądań HTTP, a dane są przechowywane po stronie serwera w bazie danych.

## Funkcje aplikacji

Aplikacja umożliwia:

* dodawanie nowych zadań,
* wyświetlanie listy zadań,
* zmianę statusu zadania,
* usuwanie zadań,
* automatyczne odświeżanie listy zadań co kilka sekund.

## Endpointy API

Aplikacja udostępnia następujące endpointy:

* `GET /api/tasks` — pobranie listy zadań,
* `GET /api/tasks/{id}` — pobranie jednego zadania,
* `POST /api/tasks` — dodanie nowego zadania,
* `PUT /api/tasks/{id}` — edycja zadania,
* `DELETE /api/tasks/{id}` — usunięcie zadania,
* `GET /api/status` — sprawdzenie działania API.

## Uruchomienie projektu

1. Sklonuj repozytorium z GitHuba.
2. Otwórz projekt w Visual Studio.
3. Uruchom projekt `MiniTask.Api`.
4. Po uruchomieniu otwórz aplikację w przeglądarce.
5. Dodawaj, edytuj i usuwaj zadania z poziomu strony internetowej.

## Praca z GitHubem

Podczas realizacji projektu wykorzystano funkcje GitHub służące do pracy zespołowej:

* repozytorium zdalne,
* osobne gałęzie,
* issues,
* pull requesty,
* review zmian,
* zatwierdzanie i scalanie zmian.

Projekt był realizowany samodzielnie z wykorzystaniem dwóch kont GitHub:

* `kokodiale` — konto główne, właściciel repozytorium,
* `kolegazkursu` — konto pomocnicze użyte do zasymulowania współpracy projektowej.

Dzięki temu możliwe było przećwiczenie procesu zgłaszania zmian, recenzji kodu oraz scalania pull requestów.
